import React from 'react'
import Component from './component.js'

class WrappedComponent extends React.Component {
  componentDidMount() {
    window.isComponentLoaded = true
  }

  componentWillUnmount() {
    window.isComponentLoaded = false
  }

  render() {
    return <Component {...this.props} />
  }
}

export default WrappedComponent
