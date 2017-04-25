import React from 'react'
import { render } from 'react-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { withDatGuiFromDocgen } from 'hoc-react-datgui'
import '../src/gui/styles/global.scss'
import Workbench from '../src/gui/components/workbench'

// eslint-disable-next-line import/no-absolute-path,import/first
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

const WrappedComponent = withDatGuiFromDocgen(Component)

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
