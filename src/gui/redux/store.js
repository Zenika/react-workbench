import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import model from './model'
import docgen from './docgen'

export default createStore(
  combineReducers({
    model,
    docgen,
  }),
  composeWithDevTools(applyMiddleware(thunk))
)
