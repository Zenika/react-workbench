import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import styles from './input.styles'

const Input = ({ style, className, name, value, onChange, type, propType }) => {
  return (
    <div style={style} className={merge(styles.layout, className)}>
      <label htmlFor={name}>
        {name} <small>({propType})</small>
      </label>
      <input id={name} type={type} value={value} checked={value} onChange={onChange} />
    </div>
  )
}

Input.propTypes = {
  style: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool, PropTypes.func]),
  onChange: PropTypes.func.isRequired,
  propType: PropTypes.string.isRequired,
}

Input.defaultProps = {
  style: {},
  className: '',
  value: undefined,
}

export default Input
