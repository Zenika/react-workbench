import React, { PropTypes } from 'react'
import classnames from 'classnames'
import styles from './input.styles.scss'

const Input = ({ style, className, name, defaultValue, onChange }) => {
  return (
    <div style={style} className={classnames(styles.input, className)}>
      <div>{name}</div>
      <input type="text" defaultValue={defaultValue} onChange={onChange} />
    </div>
  )
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
