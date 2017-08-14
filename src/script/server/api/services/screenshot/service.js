const chromeLauncher = require('chrome-launcher')
const chromeRemoteInterface = require('chrome-remote-interface')
const fs = require('fs')
const log = require('loglevel')

const reducers = require('../../../../redux/reducers')

const launchChrome = async (url) => {
  const chrome = await chromeLauncher.launch({
    startingUrl: url,
    chromeFlags: ['--disable-gpu', '--headless'],
  })
  return chrome
}

const connectToChrome = async (port) => {
  const client = await chromeRemoteInterface({ port })
  const { DOM, Page } = client

  // check chrome version
  const version = await chromeRemoteInterface.Version({ port })
  log.info(version.Browser)
  log.info(version['Protocol-Version'])

  await Page.enable()
  await DOM.enable()
  return client
}

const getComponentBox = async (client) => {
  const { DOM } = client
  const { root } = await DOM.getDocument()
  const { nodeId } = await DOM.querySelector({
    selector: '#component > *',
    nodeId: root.nodeId,
  })
  const { model } = await DOM.getBoxModel({ nodeId })
  return {
    x: model.content[0],
    y: model.content[1],
    width: model.width,
    height: model.height,
    scale: 1,
  }
}

const captureScreenshot = async (client, metrics) => {
  const { Page, Emulation } = client
  // set screen / device metrics
  if (metrics) await Emulation.setDeviceMetricsOverride(metrics)
  // get component bounding box
  const componentBox = await getComponentBox(client)
  // capture component screenshot
  const { data } = await Page.captureScreenshot({ clip: componentBox })
  return data
}

const saveCapture = async (data) => {
  const buffer = Buffer.from(data, 'base64')
  await fs.writeFileAsync('output.png', buffer)
}

/**
 * Capture a screenshot of the tested component
 * @param {*} metrics see https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride
 */
const capture = metrics => async (dispatch, getState) => {
  const { PORT } = reducers.config.get()(getState())
  const url = `http://localhost:${PORT}`
  let chrome
  let client
  try {
    log.info(`launch chrome headless on ${url}`)
    chrome = await launchChrome(url)
    client = await connectToChrome(chrome.port)
    const image = await captureScreenshot(client, metrics)
    await saveCapture(image)
    log.info('screenshot captured')
  } catch (ex) {
    log.error(ex)
  } finally {
    if (client) client.close()
    if (chrome) await chrome.kill()
  }
}

module.exports = {
  capture,
}
