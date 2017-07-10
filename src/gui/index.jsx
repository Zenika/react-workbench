import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import App from './components/app'

import './styles/global'

render(<App />, document.getElementById('app'))
