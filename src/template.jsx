import React from 'react'
import { render } from 'react-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import mapValues from 'lodash/mapValues'
import { withDatGui } from 'hoc-react-datgui'

// eslint-disable-next-line import/no-absolute-path
import Component from '/* react-workbench-insert import */'

// --- REDUX
const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_STATE': return payload
    case 'INIT_STATE': return {}
    default: return state
  }
}

const store = createStore(
  reducer,
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)
// --- !! REDUX

/* eslint-disable no-underscore-dangle, no-eval */
// get component info and generate datgui
const model = mapValues(
  Component.__docgenInfo.props,
  value => ({
    type: value.type.name,
    defaultValue: eval(value.defaultValue && value.defaultValue.value),
  }),
)
const WrappedComponent = withDatGui(Component, model)
/* eslint-enable no-underscore-dangle, no-eval */

const App = () => (
  <Provider store={store}>
    <WrappedComponent />
  </Provider>
)

render(
  <App />,
  document.getElementById('app'),
)
