import { combineReducers } from 'redux'
import { simpleObject, keyValue } from 'trampss-redux-factory'
import component from './component'
import documentation from './documentation'
import router from './router'
import ui from './ui'

export const docgen = simpleObject({ defaultData: { props: {} }, name: 'docgen' })
export const unhandledErrors = keyValue({ key: 'timestamp', name: 'unhandledErrors' })

export default combineReducers({
  component,
  docgen,
  documentation,
  router: router.reducer,
  ui,
  unhandledErrors,
})
