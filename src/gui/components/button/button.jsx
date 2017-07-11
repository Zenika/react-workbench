import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ label, onClick, className, style }) => {
  return (
    <button className={className} style={style} onClick={onClick}>
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

Button.defaultProps = {
  label: 'button',
  className: undefined,
  style: undefined,
}

export default Button
