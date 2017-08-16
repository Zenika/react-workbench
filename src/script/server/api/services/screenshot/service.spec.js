/* eslint-env jest */
jest.mock('chrome-launcher', () => ({ launch: jest.fn() }))
jest.mock('chrome-remote-interface', async () => ({
  Version: jest.fn(),
  DOM: jest.fn(),
  Page: jest.fn(),
  Emulation: jest.fn(),
}))

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
