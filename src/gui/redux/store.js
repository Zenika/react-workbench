import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initializeCurrentLocation } from 'redux-little-router'
import thunk from 'redux-thunk'
import router from './router'
import model from './model'
import docgen from './docgen'

// initialize redux store
const store = createStore(
  combineReducers({
    router: router.reducer,
    model,
    docgen,
  }),
  composeWithDevTools(router.enhancer, applyMiddleware(thunk, router.middleware))
)

// initialize routing
const initialLocation = store.getState().router
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation))
}

export default store
