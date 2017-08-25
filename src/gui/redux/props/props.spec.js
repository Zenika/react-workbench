/* eslint-env jest */
import { createStore, combineReducers } from 'redux'
import { docgen } from '../store'
import props from './props'
import * as selectors from './props.selectors'

const reducers = combineReducers({ component: combineReducers({ props }), docgen })

describe('gui/redux/props', () => {
  describe('reducer', () => {
    let store

    beforeEach(() => {
      store = createStore(reducers)
    })

    it('should transform SET_DOCGEN to SET_PROPS action', () => {
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

      // check if props state is updated
      expect(store.getState().component.props).toMatchSnapshot()
    })

    it('should convert gui values to props values', () => {
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
      // dispatch docgen props action
      store.dispatch(props.update({ name: 'foo', value: 'bar', type: 'string' }))

      // check if props is updated
      expect(store.getState().component.props).toMatchSnapshot()
    })
  })

  describe('selectors', () => {
    let store

    beforeEach(() => {
      store = createStore(reducers)
    })

    it('should get component value in props state', () => {
      store.dispatch(props.set([{ name: 'foo', value: 'bar', type: 'string' }]))
      const value = selectors.getComponentValue('foo', 'string')(store.getState())
      expect(value).toBe('bar')
    })

    it('should get all component prop in props state', () => {
      store.dispatch(props.set([{ name: 'foo', value: 'bar', type: 'string' }]))
      const compProps = selectors.getComponentProps(store.getState())
      expect(compProps).toEqual({ foo: 'bar' })
    })
  })
})
