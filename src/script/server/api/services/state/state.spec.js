/* eslint-env jest */

jest.mock('../../db', () => {
  const read = jest.fn(async () => undefined)
  const write = jest.fn(async () => undefined)

  return () => ({ read, write })
})

const db = require('../../db')
const service = require('./service')

describe('server/model/state', () => {
  describe('create', () => {
    it('should append a new state', () => {
      // data
      const state = { a: 'state' }

      // calls
      service.create(state)

      // asserts
      expect(db().write.mock.calls.length).toBe(1)
      expect(db().write.mock.calls[0]).toEqual([state])
    })
  })

  describe('read', () => {
    beforeEach(() => {
      db().read.mockReset()
      db().read.mockRestore()
    })

    it('should read states', async () => {
      // data
      const mockStates = ['state1', 'state2']

      // mocks
      db().read.mockImplementation(jest.fn(async () => mockStates))

      // calls
      const states = await service.read()

      // asserts
      expect(db().read.mock.calls.length).toBe(1)
      expect(db().read.mock.calls[0]).toEqual([])
      expect(states).toBe(mockStates)
    })

    it('should initialize states', async () => {
      // calls
      const states = await service.read()

      // asserts
      expect(db().read.mock.calls.length).toBe(1)
      expect(db().read.mock.calls[0]).toEqual([])
      expect(states).toEqual({})
    })
  })
})
