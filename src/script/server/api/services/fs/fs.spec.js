/* eslint-env jest */
jest.mock('fs', () => ({
  readdirAsync: jest.fn(async () => undefined),
  readFileAsync: jest.fn(async () => undefined),
  statAsync: jest.fn(async () => Object.setPrototypeOf({}, { isDirectory: () => true })),
}))

const fs = require('fs')
const service = require('./service')

describe('server/api/models/fs', () => {
  beforeEach(() => {
    fs.readdirAsync.mockClear()
    fs.statAsync.mockClear()
    fs.statAsync.mockClear()
  })

  it('should list folder', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['baz.txt', 'bat']))

    // calls
    const result = await service.get('/foo/bar')

    // asserts
    expect(result).toBeDefined()
    expect(result.length).toBe(2)
  })

  it('should handle empty folder', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => []))

    // calls
    const result = await service.get('/foo/bar')

    // asserts
    expect(result).toBeDefined()
    expect(result.length).toBe(0)
  })

  it('should list folder with fullname, name, ext, isDirectory and other stats metadata', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['baz.txt']))
    fs.statAsync.mockImplementationOnce(
      jest.fn(async () => Object.setPrototypeOf({
        foo: 'foo',
        bar: 'bar',
      }, { isDirectory: () => true }))
    ).mockImplementationOnce(
      jest.fn(async () => Object.setPrototypeOf({
        foo: 'foo',
        bar: 'bar',
      }, { isDirectory: () => false }))
    )


    // calls
    const result = await service.get('/foo/bar')

    // asserts
    expect(result).toBeDefined()
    expect(result.length).toBe(1)
    expect(result[0].fullname).toBe('baz.txt')
    expect(result[0].ext).toBe('.txt')
    expect(result[0].isDirectory).toBe(false)
    expect(result[0].foo).toBe('foo')
    expect(result[0].bar).toBe('bar')
  })


  it('should give file fullname, name, ext, isDirectory and other stats metadata', async () => {
    // mocks
    fs.statAsync.mockImplementation(
      jest.fn(async () => Object.setPrototypeOf({
        foo: 'foo',
        bar: 'bar',
      }, { isDirectory: () => false }))
    )

    // calls
    const result = await service.get('/foo/bar/baz.txt')

    // asserts
    expect(result).toBeDefined()
    expect(result.fullname).toBe('baz.txt')
    expect(result.ext).toBe('.txt')
    expect(result.isDirectory).toBe(false)
    expect(result.foo).toBe('foo')
    expect(result.bar).toBe('bar')
  })
})
