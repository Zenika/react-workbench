/* eslint-env jest */
jest.mock('chrome-launcher', () => ({
  launch: jest.fn(async () => ({ kill: jest.fn() })),
}))

jest.mock('chrome-remote-interface', () =>
  jest.fn(async () => ({
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
    Emulation: jest.fn(),
    close: jest.fn(),
  }))
)

const chromeRemoteInterface = require('chrome-remote-interface')

chromeRemoteInterface.Version = jest.fn(async () => ({ Browser: 'HeadlessChrome/62.0.3185.0' }))

const screenshot = require('./service')

const getState = () => ({
  config: {
    data: {
      PORT: 8080,
    },
  },
})

describe('services/screenshot', () => {
  it('should start chrome', async () => {
    screenshot.capture()(undefined, getState)
  })
})
