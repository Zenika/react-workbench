/* eslint-env jest */
jest.mock('fs', () => ({
  readFileAsync: jest.fn(async () => undefined),
  statAsync: jest.fn(async () => ({ isDirectory: () => false })),
}))

jest.mock('react-docgen', () => ({ parse: jest.fn() }))
jest.mock('./resolvers', () => ({ indexResolver: 'indexResolver', componentResolver: 'componentResolver' }))

const fs = require('fs')
const docgen = require('react-docgen')
const service = require('./service')

describe('server/api/models/docgen', () => {
  beforeEach(() => {
    fs.readFileAsync.mockClear()
    fs.statAsync.mockClear()
    docgen.parse.mockClear()
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
    expect(docgen.parse.mock.calls.length).toBe(1)
    expect(docgen.parse.mock.calls[0][1]).toEqual('componentResolver')
  })

  it('should resolve .js file (without extension)', async () => {
    // calls
    await service.resolve('/foo/bar/test')

    // asserts
    expect(fs.readFileAsync.mock.calls.length).toBe(1)
    expect(fs.readFileAsync.mock.calls[0][0]).toBe('/foo/bar/test.js')
    expect(docgen.parse.mock.calls.length).toBe(1)
    expect(docgen.parse.mock.calls[0][1]).toEqual('componentResolver')
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
    expect(docgen.parse.mock.calls.length).toBe(1)
    expect(docgen.parse.mock.calls[0][1]).toEqual('componentResolver')
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
    expect(docgen.parse.mock.calls.length).toBe(1)
    expect(docgen.parse.mock.calls[0][1]).toEqual('componentResolver')
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
    expect(docgen.parse.mock.calls.length).toBe(1)
    expect(docgen.parse.mock.calls[0][1]).toEqual('indexResolver')
  })


  it('should resolve component in another file path when it is called', async () => {
    // mocks
    docgen.parse.mockImplementationOnce(jest.fn(() => {
      const error = { path: '/foo/bar/test/next' }
      throw error
    }))

    // calls
    await service.resolve('/foo/bar/test')

    // asserts
    expect(fs.readFileAsync.mock.calls.length).toBe(2)
    expect(fs.readFileAsync.mock.calls[0][0]).toBe('/foo/bar/test.js')
    expect(fs.readFileAsync.mock.calls[1][0]).toBe('/foo/bar/test/next.js.js') // WHY ?????????
    expect(docgen.parse.mock.calls.length).toBe(2)
    expect(docgen.parse.mock.calls[0][1]).toEqual('componentResolver')
    expect(docgen.parse.mock.calls[1][1]).toEqual('componentResolver')
  })

  it('should resolve component in an index path when it is called', async () => {
    // mocks
    docgen.parse.mockImplementationOnce(jest.fn(() => {
      const error = { path: '/foo/bar/test/index' }
      throw error
    }))

    // calls
    await service.resolve('/foo/bar/test/index')

    // asserts
    expect(fs.readFileAsync.mock.calls.length).toBe(2)
    expect(fs.readFileAsync.mock.calls[0][0]).toBe('/foo/bar/test/index.js')
  })

  it('should throw an error when unexpected fs error happens', async () => {
    // mocks
    docgen.parse.mockImplementationOnce(jest.fn(() => {
      throw new Error('unexpected')
    }))

    // calls
    let error = false
    try {
      await service.resolve('/foo/bar/test')
    } catch (ex) {
      error = true
    }
    // asserts
    expect(error).toBe(true)
  })

  it('should throw an error when unexpected fs error happens', async () => {
    // mocks
    fs.statAsync.mockImplementationOnce(jest.fn(() => {
      throw new Error('unexpected')
    }))

    // calls
    let error = false
    try {
      await service.resolve('/foo/bar/test')
    } catch (ex) {
      error = true
    }
    // asserts
    expect(error).toBe(true)
  })

  it('should return an exception when no filepath resolved', async () => {
    // mocks
    fs.statAsync
      .mockImplementationOnce(jest.fn(async () => ({ isDirectory: () => false })))
      .mockImplementation(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))

    // mocks
    docgen.parse.mockImplementationOnce(jest.fn(() => {
      const error = { path: '/foo/bar/test/index' }
      throw error
    }))

    // calls
    let error = false
    try {
      await service.resolve('/foo/bar/test')
    } catch (ex) {
      error = true
    }
    // asserts
    expect(error).toBe(true)
  })
})
