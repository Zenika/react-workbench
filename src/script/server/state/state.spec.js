/* eslint-env jest */

jest.mock('../db', () => {
  const read = jest.fn()
  const write = jest.fn()
  const list = jest.fn()

  return () => ({ read, write, list })
})

const db = require('../db')
const service = require('./state')

describe('server/model/state', () => {
  beforeEach(() => {
    db().read.mockReset()
    db().write.mockReset()
    db().list.mockReset()

    db().read.mockRestore()
    db().write.mockRestore()
    db().list.mockRestore()
  })

  describe('list', () => {
    it('should handle empty directory', async () => {
      // data & mocks
      db().list.mockImplementation(jest.fn(() => []))

      // calls
      const result = await service.list()()

      // asserts
      expect(result).toMatchSnapshot()
      expect(db().list.mock.calls).toMatchSnapshot()
    })

    it('should returns all files content', async () => {
      // data & mocks
      db().list.mockImplementation(jest.fn(() => ['file 1', 'file 2']))
      db().read
        .mockReturnValueOnce('content file 1')
        .mockReturnValueOnce('content file 2')

      // calls
      const result = await service.list()()

      // asserts
      expect(result).toMatchSnapshot()
      expect(db().list.mock.calls).toMatchSnapshot()
      expect(db().read.mock.calls).toMatchSnapshot()
    })
  })

  describe('create', () => {
    it('should append a new state', () => {
      // data
      const state = { a: 'state' }

      // calls
      service.create(state)()

      // asserts
      expect(db().write.mock.calls.length).toBe(1)
    })
  })

  describe('read', () => {
    it('should read states', async () => {
      // data
      const mockStates = ['state1', 'state2']

      // mocks
      db().read.mockImplementation(jest.fn(async () => mockStates))

      // calls
      const states = await service.read()()

      // asserts
      expect(db().read.mock.calls.length).toBe(1)
      expect(states).toBe(mockStates)
    })

    it('should initialize states', async () => {
      // calls
      const states = await service.read()()

      // asserts
      expect(db().read.mock.calls.length).toBe(1)
      expect(states).toEqual({})
    })
  })
})
