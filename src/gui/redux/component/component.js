import { combineReducers } from 'redux'
import { simpleObject } from 'trampss-redux-factory'
import p from './props'

export const state = simpleObject({ path: 'component', name: 'state' })
export const props = p

export default combineReducers({
  props,
  state,
})
