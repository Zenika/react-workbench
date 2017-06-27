import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import App from './components/app'

// render to DOM
ReactDom.render(<App />, document.getElementById('app'))
