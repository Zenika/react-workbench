import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './input.styles.scss'

const Input = ({ style, className, name, value, onChange, type }) => {
  return (
    <div style={style} className={classnames(styles.input, className)}>
      <div>{name}</div>
      <input type={type} value={value} checked={value} onChange={onChange} />
    </div>
  )
}

Input.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

Input.defaultProps = {
  style: {},
  className: '',
  value: undefined,
}

export default Input
