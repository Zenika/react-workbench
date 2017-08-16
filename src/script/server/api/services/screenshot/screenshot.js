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
    scale: 1,
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
    return await getImage(client, metrics)
  } finally {
    if (client) client.close()
    if (chrome) await chrome.kill()
  }
}

module.exports = {
  capture,
}
