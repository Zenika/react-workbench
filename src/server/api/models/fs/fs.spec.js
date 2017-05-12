/* eslint-env jest */
jest.mock('fs', () => ({
  readdirAsync: jest.fn(async () => undefined),
  statAsync: jest.fn(async () => Object.setPrototypeOf({}, { isDirectory: () => true })),
}))

const fs = require('fs')
const service = require('./service')

describe('server/api/models/fs', () => {
  beforeEach(() => {
    fs.readdirAsync.mockClear()
    fs.statAsync.mockClear()
  })

  it('should list folder', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['baz.txt', 'bat']))

    // calls
    const result = await service.ls('/foo/bar')

    // asserts
    expect(result).toBeDefined()
    expect(result.length).toBe(2)
  })

  it('should handle empty folder', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => []))

    // calls
    const result = await service.ls('/foo/bar')

    // asserts
    expect(result).toBeDefined()
    expect(result.length).toBe(0)
  })

  it('should give fullname, name, ext and isDirectory metadata', async () => {
    // mocks
    fs.readdirAsync.mockImplementation(jest.fn(async () => ['baz.txt']))

    // calls
    const result = await service.ls('/foo/bar')

    // asserts
    expect(result).toBeDefined()
    expect(result.length).toBe(1)
    expect(result[0].fullname).toBe('baz.txt')
    expect(result[0].name).toBe('baz')
    expect(result[0].ext).toBe('.txt')
    expect(result[0].isDirectory).toBe(true)
  })
})
