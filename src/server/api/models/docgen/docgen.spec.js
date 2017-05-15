/* eslint-env jest */
jest.mock('fs', () => ({
  readFileAsync: jest.fn(async () => undefined),
  statAsync: jest.fn(async () => ({ isDirectory: () => false })),
}))

jest.mock('react-docgen', () => ({ parse: jest.fn() }))
jest.mock('./resolvers', () => ({ }))

const fs = require('fs')

const service = require('./service')

describe('server/api/models/docgen', () => {
  beforeEach(() => {
    fs.readFileAsync.mockClear()
    fs.statAsync.mockClear()
  })

  it('should identify .js file (with extension)', async () => {
     // mocks
    fs.statAsync
      .mockImplementationOnce(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))
      .mockImplementationOnce(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))
      .mockImplementationOnce(jest.fn(async () => ({ isDirectory: () => false })))

    // calls
    await service.resolve('/foo/bar/test.js')

    // asserts
    expect(fs.readFileAsync.mock.calls.length).toBe(1)
    expect(fs.readFileAsync.mock.calls[0][0]).toBe('/foo/bar/test.js')
  })

  it('should resolve .js file (without extension)', async () => {
    // calls
    await service.resolve('/foo/bar/test')

    // asserts
    expect(fs.readFileAsync.mock.calls.length).toBe(1)
    expect(fs.readFileAsync.mock.calls[0][0]).toBe('/foo/bar/test.js')
  })

  it('should identify .jsx file (with extension)', async () => {
     // mocks
    fs.statAsync
      .mockImplementationOnce(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))
      .mockImplementationOnce(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))
      .mockImplementationOnce(jest.fn(async () => ({ isDirectory: () => false })))

    // calls
    await service.resolve('/foo/bar/test.jsx')

    // asserts
    expect(fs.readFileAsync.mock.calls.length).toBe(1)
    expect(fs.readFileAsync.mock.calls[0][0]).toBe('/foo/bar/test.jsx')
  })

  it('should resolve .jsx file (without extension)', async () => {
    // mocks
    fs.statAsync
      .mockImplementationOnce(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))
      .mockImplementationOnce(jest.fn(async () => ({ isDirectory: () => false })))

    // calls
    await service.resolve('/foo/bar/test')

    // asserts
    expect(fs.readFileAsync.mock.calls.length).toBe(1)
    expect(fs.readFileAsync.mock.calls[0][0]).toBe('/foo/bar/test.jsx')
  })

  it('should identify index file when a directory is given', async () => {
    // mocks
    fs.statAsync
      .mockImplementationOnce(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))
      .mockImplementationOnce(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))
      .mockImplementationOnce(jest.fn(async () => ({ isDirectory: () => true })))

    // calls
    await service.resolve('/foo/bar/test')

    // asserts
    expect(fs.readFileAsync.mock.calls.length).toBe(1)
    expect(fs.readFileAsync.mock.calls[0][0]).toBe('/foo/bar/test/index.js')
  })

  it('should parse file with the componentResolver if it\'s component file')
  it('should parse file with the indexResolver if it\'s an index file')
  it('should return null when nothing found')
  it('should throw an error when unexpected fs error happens')
  it('should resolve component in another file path when it is called')
})
