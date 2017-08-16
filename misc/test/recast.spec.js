/* eslint-env jest */
const { parse } = require('./recast')

jest.mock('recast', () => ({
  parse: jest.fn(source => ({ program: source })),
  types: {
    NodePath: class {
      constructor(param) {
        this.param = param
      }
    },
  },
}))

describe('tests/recast', () => {
  describe('parse', () => {
    it('should take one string containing javascript code', () => {
      const result = parse('const React = require("React")')
      expect(result).toMatchSnapshot()
    })
    it('should take an array string containing javascript code and join it', () => {
      const result = parse(['const React = require("React")', 'const React = require("React")'])
      expect(result).toMatchSnapshot()
    })
  })
})
