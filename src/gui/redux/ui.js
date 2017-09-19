import { combineReducers } from 'redux'
import { simpleObject } from 'trampss-redux-factory'

const options = { path: 'ui', prefix: 'ui' }
export const state = simpleObject({ ...options, defaultData: '', name: 'state' })
export const stateName = simpleObject({ ...options, defaultData: '', name: 'stateName' })

export default combineReducers({
  state,
  stateName,
})
