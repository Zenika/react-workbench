import { combineReducers } from 'redux'
import { simpleObject } from 'trampss-redux-factory'

const options = { path: 'documentation' }
export const readme = simpleObject({ ...options, name: 'readme' })
export const html = simpleObject({ ...options, name: 'html' })

export default combineReducers({
  readme,
  html,
})
