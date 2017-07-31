/* eslint-env jest */
import { createStore, combineReducers } from 'redux'
import docgen from '../docgen'
import model from './model'

describe('gui/redux/model', () => {
  let store

  beforeEach(() => {
    store = createStore(
      combineReducers({
        model,
        docgen,
      })
    )
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
    expect(model.isInitialized(store.getState())).toBe(true)
    expect(model.getKeys(store.getState()).includes('foo')).toBe(true)
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
    expect(model.get('foo')(store.getState()).value).toBe('bar')
  })
})
