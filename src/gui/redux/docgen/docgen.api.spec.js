/* eslint-env jest */
import { fetchDocgen } from './docgen.api'

const dispatch = jest.fn(() => ({}))

describe('gui/redux/docgen', () => {
  beforeEach(() => {
    dispatch.mockClear()
    dispatch.mockImplementation(jest.fn(action => action))
  })

  it('should dispatch RESET_DOCGEN & SET_DOCGEN with response', async () => {
    // mocks
    window.fetch = jest.fn(async () => ({
      json: async () => [{ foo: 'bar' }],
    }))

    // execute
    await fetchDocgen()(dispatch)

    // asserts
    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[0][0]).toEqual({ type: '@trampss/RESET_DOCGEN' })
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: '@trampss/SET_DOCGEN',
      payload: { foo: 'bar' },
    })
  })

  it('should dispatch SET_DOCGEN with empty object when no data fetched', async () => {
    // mocks
    window.fetch = jest.fn(async () => ({
      json: async () => undefined,
    }))

    // execute
    await fetchDocgen()(dispatch)

    // asserts
    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[0][0]).toEqual({ type: '@trampss/RESET_DOCGEN' })
    expect(dispatch.mock.calls[1][0]).toEqual({ type: '@trampss/SET_DOCGEN', payload: {} })
  })
  it('should dispatch SET_DOCGEN with empty object when an error occured', async () => {
     // mocks
    window.fetch = jest.fn(async () => ({
      json: async () => {
        throw Error()
      },
    }))

    // execute
    await fetchDocgen()(dispatch)

    // asserts
    expect(dispatch.mock.calls.length).toBe(2)
    expect(dispatch.mock.calls[0][0]).toEqual({ type: '@trampss/RESET_DOCGEN' })
    expect(dispatch.mock.calls[1][0]).toEqual({ type: '@trampss/SET_DOCGEN', payload: {} })
  })
})
