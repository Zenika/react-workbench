import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store from './redux/store'
import Workbench from './components/workbench'

export default (Component, model) => {
  // set the component prop-types model
  store.dispatch({ type: 'SET_MODEL', payload: model })

  // wrap these props to the component via redux
  const mapState = state =>
    Object.keys(state.model)
      .reduce(
        (acc, next) => ({ ...acc, [next]: state.model[next].value }),
        {},
      )
  const WrappedComponent = connect(mapState)(Component)

  // App component
  const App = () => (
    <Provider store={store}>
      <Workbench>
        <WrappedComponent />
      </Workbench>
    </Provider>
  )

  // render to DOM
  render(
    <App />,
    document.getElementById('app'),
  )
}
