import { createStore, compose, combineReducers } from 'redux'
import model from './model'

export default createStore(
  combineReducers({
    model,
  }),
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)
