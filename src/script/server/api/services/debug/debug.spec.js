/* eslint-env jest */
const debug = require('./debug')

describe('services/debug', () => {
  describe('get', () => {
    it('should return debug informations', () => {
      expect(debug.get()(undefined, () => ({ some: 'redux informations' }))).toMatchSnapshot()
    })
  })
})
