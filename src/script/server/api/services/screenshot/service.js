const chromeLauncher = require('chrome-launcher')
const chromeRemoteInterface = require('chrome-remote-interface')
const fs = require('fs')
const log = require('loglevel')

const reducers = require('../../../../redux/reducers')

const FORMAT = 'jpeg'
const DEVTOOL_PORT = 9222

const launchChrome = async (url) => {
  log.info(`launch chrome on ${url}...`)
  const chrome = await chromeLauncher.launch({
    port: DEVTOOL_PORT,
    startingUrl: url,
    chromeFlags: ['--disable-gpu', '--headless'],
  })
  return chrome
}

const connectToChrome = async (port) => {
  log.info(`connect chrome-remote-interface to port ${port}`)
  const client = await chromeRemoteInterface({ port })
  const { DOM, Page } = client
  await Page.enable()
  await DOM.enable()
  return client
}

const getComponentBox = async (client) => {
  log.info('get element bounding box')
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

const captureScreenshot = async (client, componentBox) => {
  log.info('capture element')
  const { Page } = client
  const { data } = await Page.captureScreenshot({
    format: FORMAT,
    quality: 100,
    clip: componentBox,
    fromSurface: true,
  })
  return data
}

const saveCapture = async (data) => {
  log.info('save screenshot')
  const buffer = Buffer.from(data, 'base64')
  await fs.writeFileAsync(`output.${FORMAT}`, buffer)
}

const capture = () => async (dispatch, getState) => {
  const { PORT } = reducers.config.get()(getState())

  let chrome
  let client
  try {
    chrome = await launchChrome(`http://localhost:${PORT}`)
    client = await connectToChrome(chrome.port)
    const componentBox = await getComponentBox(client)
    const image = await captureScreenshot(client, componentBox)
    await saveCapture(image)
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
