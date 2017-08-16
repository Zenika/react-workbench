/* eslint-env jest */
import { createStore, combineReducers } from 'redux'
import { docgen } from '../store'
import model from './model'
import * as selectors from './model.selectors'

describe('gui/redux/model', () => {
  describe('reducer', () => {
    let store

    beforeEach(() => {
      store = createStore(combineReducers({ model, docgen }))
    })

    it('should transform SET_DOCGEN to SET_MODEL action', () => {
      // dispatch docgen set action
      store.dispatch(
        docgen.set({
          props: {
            foo: {
              type: { name: 'string' },
              defaultValue: { value: "'foo'" },
            },
          },
        })
      )

      // check if model state is updated
      expect(store.getState().model).toMatchSnapshot()
    })

    it('should convert gui values to model values', () => {
      // dispatch docgen set action
      store.dispatch(
        docgen.set({
          props: {
            foo: {
              type: { name: 'string' },
              defaultValue: { value: "'foo'" },
            },
          },
        })
      )
      // dispatch docgen model action
      store.dispatch(model.update({ name: 'foo', value: 'bar', type: 'string' }))

      // check if model is updated
      expect(store.getState().model).toMatchSnapshot()
    })
  })

  describe('selectors', () => {
    let store

    beforeEach(() => {
      store = createStore(combineReducers({ model }))
    })

    it('should get component value in model state', () => {
      store.dispatch(model.set([{ name: 'foo', value: 'bar', type: 'string' }]))
      const value = selectors.getComponentValue('foo', 'string')(store.getState())
      expect(value).toBe('bar')
    })

    it('should get all component prop in model state', () => {
      store.dispatch(model.set([{ name: 'foo', value: 'bar', type: 'string' }]))
      const props = selectors.getComponentProps(store.getState())
      expect(props).toEqual({ foo: 'bar' })
    })
  })
})
