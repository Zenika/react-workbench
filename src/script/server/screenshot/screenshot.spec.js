/* eslint-env jest */
jest.mock('chrome-launcher', () => ({
  launch: jest.fn(async () => ({ kill: jest.fn(async () => undefined) })),
}))

const mockCRI = (isComponentLoaded = true) => jest.fn(async () => ({
  DOM: {
    enable: jest.fn(),
    getDocument: jest.fn(async () => ({ root: 'root' })),
    querySelector: jest.fn(async () => ({ nodeId: 'nodeId' })),
    getBoxModel: jest.fn(async () => ({ model: { content: [1, 2] } })),
  },
  Page: {
    enable: jest.fn(),
    captureScreenshot: jest.fn(async () => ({ data: 'data' })),
  },
  Emulation: {
    setDeviceMetricsOverride: jest.fn(),
  },
  Runtime: {
    evaluate: jest.fn(async () => ({ result: { type: 'boolean', value: isComponentLoaded } })),
  },
  close: jest.fn(),
}))

jest.mock('chrome-remote-interface', () => mockCRI())

const chromeLauncher = require('chrome-launcher')
const CRI = require('chrome-remote-interface')

CRI.Version = jest.fn(async () => ({ Browser: 'HeadlessChrome/62.0.3185.0' }))

const screenshot = require('./screenshot')

const getState = () => ({
  config: {
    data: {
      PORT: 8080,
    },
  },
})

describe('services/screenshot', () => {
  beforeEach(() => {
    CRI.mockImplementation(mockCRI())
  })

  it('should launch chrome and return screenshot data', async () => {
    // calls
    const data = await screenshot.capture()(undefined, getState)

    // asserts
    expect(chromeLauncher.launch.mock.calls.length).toBe(1)
    expect(data).toMatchSnapshot()
  })

  it('should return error when chrome version is less than 62', async () => {
    // mocks
    CRI.Version.mockImplementationOnce(jest.fn(async () => ({ Browser: 'Chrome/60.0.1.0' })))

    // calls
    let error = false
    try {
      await screenshot.capture()(undefined, getState)
    } catch (ex) {
      error = true
    }

    // asserts
    expect(error).toBe(true)
  })

  it('should throw an error when chrome is not launched', async () => {
    // mocks
    chromeLauncher.launch.mockImplementationOnce(jest.fn(async () => undefined))

    // calls
    let error = false
    try {
      await screenshot.capture()(undefined, getState)
    } catch (ex) {
      error = true
    }

    // asserts
    expect(error).toBe(true)
  })

  it.skip('should try other attemps if component not loaded before capture it', async () => {
    // mocks
    CRI.mockImplementationOnce(mockCRI(false)).mockImplementationOnce(mockCRI(true))
    // calls
    await screenshot.capture()(undefined, getState)

    // asserts
    expect(CRI.mock.instances).toBe(true)
  })

  it('should take resolution metrics', async () => {
    // calls
    const metrics = {
      width: 800,
      height: 600,
    }
    const data = await screenshot.capture(metrics)(undefined, getState)

    // asserts
    expect(data).toMatchSnapshot()
  })
})
