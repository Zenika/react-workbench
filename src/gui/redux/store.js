import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import model from './model'

export default createStore(
  combineReducers({
    model,
  }),
  composeWithDevTools(applyMiddleware(thunk))
)
