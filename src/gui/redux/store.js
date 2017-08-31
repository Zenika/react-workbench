import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initializeCurrentLocation } from 'redux-little-router'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import sagas from '../sagas'
import router from './router'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

// initialize redux store
const store = createStore(
  reducers,
  composeWithDevTools(router.enhancer, applyMiddleware(thunk, sagaMiddleware, router.middleware))
)

sagaMiddleware.run(sagas(store))

// initialize routing
const initialLocation = store.getState().router
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation))
}

export default store
