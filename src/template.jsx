import React from 'react'
import { render } from 'react-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import Component from '/* react-workbench-insert import */'

/// --- REDUX
const reducer = (state = {}, { type, payload } => {
  switch(type) {
    case 'SET_STATE': return payload
    case 'INIT_STATE': return {}
    default: return state
  }
})

const store = createStore(
  reducer,
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)
/// --- !! REDUX

const App = () => (
  <Provider store={store}>
    <Component />
  </Provider>
)

render(
  <App />,
  document.getElementById('app'),
)
