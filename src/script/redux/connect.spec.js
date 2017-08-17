/* eslint-env jest */
jest.mock('./store', () => ({
  dispatch: jest.fn(),
  getState: () => ({ a: 'state' }),
}))

const { connect, connectAll } = require('./connect')
const store = require('./store')

describe('redux/connect', () => {
  const func = jest.fn((arg1, arg2) => (dispatch, getState) => ({ arg1, arg2, ...getState(), dispatch: dispatch('action') }))

  describe('connect', () => {
    it('should connect a function', () => {
      store.dispatch.mockReset()
      const connected = connect(func)

      expect(connected('first', 2)).toMatchSnapshot()
      expect(store.dispatch.mock).toMatchSnapshot()
    })
  })

  describe('connectAll', () => {
    it('should connect all fields', () => {
      store.dispatch.mockReset()
      const connected = connectAll({
        func1: func,
        func2: func,
      })

      expect(connected.func1('first', 2)).toMatchSnapshot()
      expect(store.dispatch.mock).toMatchSnapshot()
      expect(connected.func2(2, 'first')).toMatchSnapshot()
      expect(store.dispatch.mock).toMatchSnapshot()
    })
  })
})
