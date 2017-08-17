/* eslint-env jest */
import { convertDocgenValue, docgenToModel, convertToGuiValue, convertFromGuiValue } from './docgen'

describe('gui/redux/utils', () => {
  describe('convert docgen to model structure', () => {
    it('should convert docgen to model', () => {
      const docgen = {
        props: {
          name: {
            type: { name: 'string' },
            defaultValue: { value: "'World'" },
          },
        },
      }

      expect(docgenToModel(docgen)).toMatchSnapshot()
    })
  })
  describe('convert docgen prop value to model value', () => {
    it('should convert string value', () =>
      expect(convertDocgenValue("'foo'", 'string')).toMatchSnapshot())

    it('should convert number value', () =>
      expect(convertDocgenValue('0', 'number')).toMatchSnapshot())

    it('should convert enum value', () =>
      expect(convertDocgenValue("'foo'", 'enum')).toMatchSnapshot())

    it('should convert boolean value', () =>
      expect(convertDocgenValue('false', 'bool')).toMatchSnapshot())

    it('should convert object value', () =>
      expect(convertDocgenValue("{ foo: 'bar' }", 'object')).toMatchSnapshot())

    it('should convert array value', () =>
      expect(convertDocgenValue('[1, 2]', 'array')).toMatchSnapshot())

    it('should convert symbol value', () =>
      expect(convertDocgenValue("Symbol('foo')", 'symbol')).toMatchSnapshot())

    it('should convert func value', () =>
      expect(convertDocgenValue("() => alert('test')", 'func')).toMatchSnapshot())
  })
  describe('convert model value to GUI value', () => {
    it('should convert string value', () =>
      expect(convertToGuiValue('foo', 'string')).toMatchSnapshot())

    it('should convert number value', () =>
      expect(convertToGuiValue(0, 'number')).toMatchSnapshot())

    it('should convert enum value', () =>
      expect(convertToGuiValue('foo', 'enum')).toMatchSnapshot())

    it('should convert boolean value', () =>
      expect(convertToGuiValue(false, 'bool')).toMatchSnapshot())

    it('should convert object value', () =>
      expect(convertToGuiValue({ foo: 'bar' }, 'object')).toMatchSnapshot())

    it('should convert array value', () =>
      expect(convertToGuiValue([1, 2], 'array')).toMatchSnapshot())

    it('should convert symbol value', () =>
      expect(convertToGuiValue(Symbol('foo'), 'symbol')).toMatchSnapshot())

    it('should convert func value', () =>
      expect(convertToGuiValue(() => ({}), 'func')).toMatchSnapshot())
  })
  describe('convert GUI value to model value', () => {
    it('should convert string value', () =>
      expect(convertFromGuiValue('foo', 'string')).toMatchSnapshot())

    it('should convert number value', () =>
      expect(convertFromGuiValue('0', 'number')).toMatchSnapshot())

    it('should convert enum value', () =>
      expect(convertFromGuiValue('foo', 'enum')).toMatchSnapshot())

    it('should convert boolean value', () =>
      expect(convertFromGuiValue('false', 'bool')).toMatchSnapshot())

    it('should convert object value', () =>
      expect(convertFromGuiValue("{ foo: 'bar' }", 'object')).toMatchSnapshot())

    it('should convert array value', () =>
      expect(convertFromGuiValue('[1, 2]', 'array')).toMatchSnapshot())

    it('should convert symbol value', () =>
      expect(convertFromGuiValue("Symbol('foo')", 'symbol')).toMatchSnapshot())

    it('should convert func value', () =>
      expect(convertFromGuiValue('() => ({})', 'func')).toMatchSnapshot())
  })
})
