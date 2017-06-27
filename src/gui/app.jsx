import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Workbench from './components/workbench'
import WrappedComponent from './template'

// render to DOM
render(
  <Provider store={store}>
    <Workbench>
      <WrappedComponent />
    </Workbench>
  </Provider>,
  document.getElementById('app')
)
