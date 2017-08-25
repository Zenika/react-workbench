import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initializeCurrentLocation } from 'redux-little-router'
import createSagaMiddleware from 'redux-saga'
import { simpleObject, keyValue } from 'trampss-redux-factory'
import thunk from 'redux-thunk'
import sagas from '../sagas'
import props from './props'
import router from './router'
import ui from './ui'

const sagaMiddleware = createSagaMiddleware()

export const docgen = simpleObject({ defaultData: { props: {} }, name: 'docgen' })
const documentation = 'documentation'
export const readme = simpleObject({ path: documentation, name: 'readme' })
export const html = simpleObject({ path: documentation, name: 'html' })
export const state = simpleObject({ path: 'component', name: 'state' })
export const unhandledErrors = keyValue({ key: 'timestamp', name: 'unhandledErrors' })

// initialize redux store
const store = createStore(
  combineReducers({
    component: combineReducers({
      props,
      state,
    }),
    docgen,
    [documentation]: combineReducers({
      readme,
      html,
    }),
    router: router.reducer,
    ui,
    unhandledErrors,
  }),
  composeWithDevTools(router.enhancer, applyMiddleware(thunk, sagaMiddleware, router.middleware))
)

sagaMiddleware.run(sagas(store))

// initialize routing
const initialLocation = store.getState().router
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation))
}

export default store
