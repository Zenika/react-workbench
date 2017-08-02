/* eslint-env jest */
import { fetchDocgen } from './docgen.api'

const dispatch = jest.fn()

describe('gui/redux/docgen', () => {
  beforeEach(() => {
    dispatch.mockClear()
  })

  it('should dispatch RESET_DOCGEN & SET_DOCGEN with response', async () => {
    // mocks
    window.fetch = jest.fn(async () => ({
      json: async () => [{ foo: 'bar' }],
    }))

    // execute
    await fetchDocgen()(dispatch)

    // asserts
    expect(dispatch.mock.calls).toMatchSnapshot()
  })

  it('should dispatch SET_DOCGEN with empty object when no data fetched', async () => {
    // mocks
    window.fetch = jest.fn(async () => ({
      json: async () => undefined,
    }))

    // execute
    await fetchDocgen()(dispatch)

    // asserts
    expect(dispatch.mock.calls).toMatchSnapshot()
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
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})
