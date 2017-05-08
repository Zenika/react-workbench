/* eslint-env jest */

jest.mock('../../ddb', () => {
  const read = jest.fn(async () => undefined)
  const append = jest.fn(async () => undefined)

  return () => ({ read, append })
})

const ddb = require('../../ddb')
const service = require('./service')

describe('server/model/state', () => {
  describe('create', () => {
    it('should append a new state', () => {
      // data
      const state = { a: 'state' }

      // calls
      service.create(state)

      // asserts
      expect(ddb().append.mock.calls.length).toBe(1)
      expect(ddb().append.mock.calls[0]).toEqual([state])
    })
  })

  describe('read', () => {
    beforeEach(() => {
      ddb().read.mockReset()
      ddb().read.mockRestore()
    })

    it('should read states', async () => {
      // data
      const mockStates = ['state1', 'state2']

      // mocks
      ddb().read.mockImplementation(jest.fn(async () => mockStates))

      // calls
      const states = await service.read()

      // asserts
      expect(ddb().read.mock.calls.length).toBe(1)
      expect(ddb().read.mock.calls[0]).toEqual([])
      expect(states).toBe(mockStates)
    })

    it('should initialize states', async () => {
      // calls
      const states = await service.read()

      // asserts
      expect(ddb().read.mock.calls.length).toBe(1)
      expect(ddb().read.mock.calls[0]).toEqual([])
      expect(states).toEqual([])
    })
  })
})
