import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux/store'
import AppLayout from './appLayout'

const App = () =>
  <Provider store={store}>
    <AppLayout />
  </Provider>

export default App
