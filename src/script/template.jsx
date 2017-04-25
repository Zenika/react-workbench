import React from 'react'
import { render } from 'react-dom'
import { createStore, compose, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'
import '../src/gui/styles/global.scss'
import Workbench from '../src/gui/components/workbench'

// eslint-disable-next-line import/no-absolute-path,import/first
import Component from '/* react-workbench-insert import */'

// --- REDUX
const component = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_STATE': return { ...state, ...payload }
    case 'INIT_STATE': return {}
    default: return state
  }
}

const model = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_MODEL': return payload
    default: return state
  }
}

const store = createStore(
  combineReducers({ component, model }),
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)
// --- !! REDUX

// eslint-disable-next-line no-underscore-dangle
store.dispatch({ type: 'SET_MODEL', payload: Component.__docgenInfo.props })

// connect the tested component to the redux state
const WrappedComponent = connect(state => state.component)(Component)

const App = () => (
  <Provider store={store}>
    <Workbench>
      <WrappedComponent />
    </Workbench>
  </Provider>
)

render(
  <App />,
  document.getElementById('app'),
)
