/* eslint-env jest */
jest.mock('fs', () => ({
  readdirAsync: jest.fn(async () => undefined),
  statAsync: jest.fn(async () => undefined),
}))

jest.mock('loglevel', () => ({
  debug: jest.fn(() => undefined),
  warn: jest.fn(() => undefined),
}))

const fs = require('fs')
const loglevel = require('loglevel')
const service = require('./modules')

describe('server/webpack/modules', () => {
  // data
  const component = { path: { absolute: { dir: '/foo/bar' } } }

  beforeEach(() => {
    fs.readdirAsync.mockClear()
    fs.statAsync.mockClear()
    loglevel.warn.mockClear()
  })

  it('should add base folder and node_modules folder by default', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['package.json']))

    // calls
    const paths = await service.get(component)

    // asserts
    expect(paths).toBeDefined()
    expect(paths).toContain('/foo/bar')
    expect(paths).toContain('/foo/bar/node_modules')
  })

  it('should add src folder if exists', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['package.json', 'src']))

    // calls
    const paths = await service.get(component)

    // asserts
    expect(paths).toBeDefined()
    expect(paths).toContain('/foo/bar/src')
  })

  it('should add styles folder if exists', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['package.json', 'styles']))

    // calls
    const paths = await service.get(component)

    // asserts
    expect(paths).toBeDefined()
    expect(paths).toContain('/foo/bar/styles')
  })

  it('should show warning when package.json not found', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['/']))

    // calls
    const paths = await service.get(component)

    // asserts
    expect(loglevel.warn.mock.calls.length).toBe(1)
    expect(loglevel.warn.mock.calls[0][0]).toBe('package.json not found, unable to identify project root')
    expect(paths).toBeDefined()
    expect(paths.length).toBe(0)
  })

  it('should show warning when node_modules not found', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['package.json']))
    fs.statAsync.mockImplementation(jest.fn(async () => {
      const error = { errno: -2 }
      throw error
    }))

    // calls
    const paths = await service.get(component)

    // asserts
    expect(loglevel.warn.mock.calls.length).toBe(1)
    expect(loglevel.warn.mock.calls[0][0]).toBe('node_modules doesn\'t exist in [/foo/bar], please resolve dependencies')
    expect(paths).toBeDefined()
    expect(paths.length).toBe(0)
  })

  it('should throw an error when unexpected fs error happens', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['package.json']))
    fs.statAsync.mockImplementation(jest.fn(async () => {
      throw new Error()
    }))

    // calls
    try {
      await service.get(component)
    } catch (ex) {
      // asserts
      expect(ex).toBeDefined()
    }
  })
})
