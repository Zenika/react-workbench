const chromeLauncher = require('chrome-launcher')
const chromeRemoteInterface = require('chrome-remote-interface')
const isEmpty = require('lodash/isEmpty')
const log = require('loglevel')

const reducers = require('../../../../redux/reducers')

const getChrome = async (url) => {
  log.info(`launch chrome headless on ${url}`)
  const chrome = await chromeLauncher.launch({
    startingUrl: url,
    chromeFlags: ['--disable-gpu', '--headless'],
  })
  return chrome
}

const getClient = async (port) => {
  // check chrome version
  const versionInfo = await chromeRemoteInterface.Version({ port })
  log.info(`chrome version found : ${versionInfo.Browser}`)
  const versionNumber = versionInfo.Browser.match(/\d+/g)[0] // HeadlessChrome/62.0.3185.0
  if (versionNumber < 62) {
    throw Error(
      'Your Chrome version is too old, you need at least version 62 to capture screenshots with react-workbench.'
    )
  }

  // connect to chrome
  const client = await chromeRemoteInterface({ port })
  const { DOM, Page } = client
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
    scale: 2,
  }
}

const getImage = async (client, metrics) => {
  const { Page, Emulation } = client
  // set screen / device metrics
  if (!isEmpty(metrics)) await Emulation.setDeviceMetricsOverride(metrics)
  // get component bounding box
  const componentBox = await getComponentBox(client)
  // capture component screenshot
  const { data } = await Page.captureScreenshot({ clip: componentBox })
  return Buffer.from(data, 'base64')
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

const isComponentLoaded = async (client) => {
  const { Runtime } = client
  const { result } = await Runtime.evaluate({ expression: 'window.isComponentLoaded' })
  return result && result.type === 'boolean' && result.value
}

const getImageFallback = async (client, metrics, attemp = 1) => {
  const isLoaded = await isComponentLoaded(client)
  if (isLoaded) {
    return getImage(client, metrics)
  } else if (attemp <= 10) {
    log.info(`attemp number ${attemp}`)
    await timeout(100 * attemp)
    return getImageFallback(client, metrics, attemp + 1)
  }
  throw Error('Unable to capture screenshot, component is unavailable')
}

/**
 * Capture a screenshot of the tested component
 * @param {*} metrics see https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride
 */
const capture = metrics => async (dispatch, getState) => {
  const { PORT } = reducers.config.get()(getState())
  let chrome
  let client
  try {
    chrome = await getChrome(`http://localhost:${PORT}`)
    client = await getClient(chrome.port)
    return await getImageFallback(client, metrics)
  } finally {
    if (client) client.close()
    if (chrome) await chrome.kill()
  }
}

module.exports = {
  capture,
}
