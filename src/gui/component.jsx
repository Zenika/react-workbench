import React from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import Component from './component.js'

class WrappedComponent extends React.Component {
  componentDidMount() {
    window.isComponentLoaded = true
  }

  componentDidUpdate() {
    if (this.component && this.component.setState) this.component.setState(this.props.state)
  }

  componentWillUnmount() {
    window.isComponentLoaded = false
  }

  wrapComponentState = (component) => {
    if (!component || !component.state) return

    // first connexion
    this.component = component
    this.props.setState(component.state)

    // observe component setState
    const setState = component.setState
    component.setState = ((o) => { // eslint-disable-line no-param-reassign
      const { state, props } = component

      // get state to store to workbench store
      let reduxState = o
      if (isFunction(o)) reduxState = o(state, props)

      // call the real component setState
      setState.bind(component)(o)

      // update workbench store
      this.props.setState(reduxState)
    })
  }

  render() {
    return <Component ref={this.wrapComponentState} {...this.props} />
  }
}

WrappedComponent.propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.object,
}

WrappedComponent.defaultProps = {
  state: undefined,
}

export default WrappedComponent
