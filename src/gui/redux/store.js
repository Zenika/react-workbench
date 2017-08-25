import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initializeCurrentLocation } from 'redux-little-router'
import { simpleObject } from 'trampss-redux-factory'
import thunk from 'redux-thunk'
import router from './router'
import props from './props'

export const docgen = simpleObject({ defaultData: { props: {} }, name: 'docgen' })
const documentation = 'documentation'
export const readme = simpleObject({ path: documentation, name: 'readme' })
export const html = simpleObject({ path: documentation, name: 'html' })
export const state = simpleObject({ path: 'component', name: 'state' })

// initialize redux store
const store = createStore(
  combineReducers({
    docgen,
    [documentation]: combineReducers({
      readme,
      html,
    }),
    component: combineReducers({
      props,
      state,
    }),
    router: router.reducer,
  }),
  composeWithDevTools(router.enhancer, applyMiddleware(thunk, router.middleware))
)

// initialize routing
const initialLocation = store.getState().router
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation))
}

export default store
