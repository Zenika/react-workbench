import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

const render = (Component) => {
  ReactDOM.render(<Component />, document.getElementById('app'))
}

render(App)

if (module.hot) {
  module.hot.accept(() => {
    console.log('re-render app')
    render(App)
  })
}
