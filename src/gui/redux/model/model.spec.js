/* eslint-env jest */
import reducer from './model'
import { updateProp, UPDATE_PROP } from './model.actions'

describe('gui/redux/model', () => {
  it('should initialize state', () => {
    // execute
    const state = reducer(undefined, { type: undefined })

    // asserts
    expect(state).toBeDefined()
    expect(state).toEqual({})
  })

  describe('RECEIVED_DOCGEN action', () => {
    it.skip('should update state with model')
  })

  describe(`${UPDATE_PROP} action`, () => {
    it('should update state with "boolean" value', () => {
      // data
      const prevState = { foo: { type: 'bool' } }

      // execute
      const state = reducer(prevState, updateProp('foo', 'bool', true))

      // asserts
      expect(state).toBeDefined()
      expect(state.foo).toBeDefined()
      expect(typeof state.foo).toBe('boolean')
      expect(state.foo).toBe(true)
    })

    it('should update state with "object" value', () => {
      // data
      const prevState = { foo: { type: 'object' } }

      // execute
      const state = reducer(prevState, updateProp('foo', 'object', "{ bar: 'val' }"))

      // asserts
      expect(state).toBeDefined()
      expect(state.foo).toBeDefined()
      expect(typeof state.foo).toBe('object')
      expect(state.foo).toEqual({ bar: 'val' })
    })

    it('should update state with "array" value', () => {
      // data
      const prevState = { foo: { type: 'array' } }

      // execute
      const state = reducer(prevState, updateProp('foo', 'array', "['item1', 'item2']"))

      // asserts
      expect(state).toBeDefined()
      expect(state.foo).toBeDefined()
      expect(typeof state.foo).toBe('object')
      expect(state.foo).toEqual(['item1', 'item2'])
    })

    it('should update state with "func" value', () => {
      // data
      const prevState = { foo: { type: 'func' } }
      const func = '() => "hello world"'

      // execute
      const state = reducer(prevState, updateProp('foo', 'func', func))

      // asserts
      expect(state).toBeDefined()
      expect(state.foo).toBeDefined()
      expect(typeof state.foo).toBe('function')
      expect(state.foo.toString()).toEqual(func)
    })

    it('should update state with "string" value', () => {
      // data
      const prevState = { foo: { type: 'string' } }

      // execute
      const state = reducer(prevState, updateProp('foo', 'string', 'bar'))

      // asserts
      expect(state).toBeDefined()
      expect(state.foo).toBeDefined()
      expect(typeof state.foo).toBe('string')
      expect(state.foo).toEqual('bar')
    })
  })
})
