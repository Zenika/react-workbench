/* eslint-env jest */
import { SET_MODEL, SET_VALUE, setModel, setValue } from './model.actions'
import reducer from './model'

describe('gui/redux/model', () => {
  describe('actions', () => {
    it(`should generate ${SET_MODEL} action`, () => {
      // data
      const model = { foo: {}, bar: {} }

      // execute
      const action = setModel(model)

      // asserts
      expect(action).toBeDefined()
      expect(action).toEqual({ type: SET_MODEL, payload: model })
    })

    it(`should generate ${SET_VALUE} action`, () => {
      // data
      const name = 'foo'
      const value = 'bar'

      // execute
      const action = setValue(name, value)

      // asserts
      expect(action).toBeDefined()
      expect(action).toEqual({ type: SET_VALUE, payload: { name, value } })
    })
  })

  describe('reducer', () => {
    it('should initialize state', () => {
      // execute
      const state = reducer(undefined, { type: undefined })

      // asserts
      expect(state).toBeDefined()
      expect(state).toEqual({ })
    })

    describe(`${SET_MODEL} action`, () => {
      it('should update state with model', () => {
        // data
        const model = { foo: {}, bar: {} }

        // execute
        const state = reducer(undefined, setModel(model))

        // asserts
        expect(state).toBeDefined()
        expect(state).toEqual(model)
      })
    })

    describe(`${SET_VALUE} action`, () => {
      it('should update state with "boolean" value', () => {
        // data
        const prevState = { foo: { type: 'bool' } }

        // execute
        const state = reducer(prevState, setValue('foo', true))

        // asserts
        expect(state).toBeDefined()
        expect(state.foo).toBeDefined()
        expect(typeof state.foo.value).toBe('boolean')
        expect(state.foo.value).toBe(true)
      })

      it('should update state with "object" value', () => {
        // data
        const prevState = { foo: { type: 'object' } }

        // execute
        const state = reducer(prevState, setValue('foo', '{ bar: \'val\' }'))

        // asserts
        expect(state).toBeDefined()
        expect(state.foo).toBeDefined()
        expect(typeof state.foo.value).toBe('object')
        expect(state.foo.value).toEqual({ bar: 'val' })
      })

      it('should update state with "array" value', () => {
        // data
        const prevState = { foo: { type: 'array' } }

        // execute
        const state = reducer(prevState, setValue('foo', '[\'item1\', \'item2\']'))

        // asserts
        expect(state).toBeDefined()
        expect(state.foo).toBeDefined()
        expect(typeof state.foo.value).toBe('object')
        expect(state.foo.value).toEqual(['item1', 'item2'])
      })

      it('should update state with "func" value', () => {
        // data
        const prevState = { foo: { type: 'func' } }
        const func = '() => "hello world"'

        // execute
        const state = reducer(prevState, setValue('foo', func))

        // asserts
        expect(state).toBeDefined()
        expect(state.foo).toBeDefined()
        expect(typeof state.foo.value).toBe('function')
        expect(state.foo.value.toString()).toEqual(func)
      })

      it('should update state with "string" value', () => {
        // data
        const prevState = { foo: { type: 'string' } }

        // execute
        const state = reducer(prevState, setValue('foo', 'bar'))

        // asserts
        expect(state).toBeDefined()
        expect(state.foo).toBeDefined()
        expect(typeof state.foo.value).toBe('string')
        expect(state.foo.value).toEqual('bar')
      })
    })
  })
})
