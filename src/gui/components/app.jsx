import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Workbench from './workbench'
import WrappedComponent from '../component.container'

// render to DOM
const App = () =>
  <Provider store={store}>
    <Workbench>
      <WrappedComponent />
    </Workbench>
  </Provider>

export default App
