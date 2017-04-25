import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './input.styles.scss'

class Input extends Component {

  handleChange = ({ target }) => {
    this.props.onChange(target.value)
  }

  render() {
    const { style, className, name, defaultValue } = this.props
    return (
      <div style={style} className={classnames(styles.input, className)}>
        <div>{name}</div>
        <input type="text" defaultValue={defaultValue} onChange={this.handleChange} />
      </div>
    )
  }
}

Input.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Input.defaultProps = {
  style: {},
  className: '',
  defaultValue: undefined,
}

export default Input
