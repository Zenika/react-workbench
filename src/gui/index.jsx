import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import App from './app'

import './styles/global'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
