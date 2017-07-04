import React from 'react'
import PropTypes from 'prop-types'

const innerStyle = {
  container: {
    marginBottom: '5px',
    fontSize: '0.9em',
  },
  input: {
    border: 'none',
    width: '95%',
    backgroundColor: '#7E8AA2',
    color: '#FFF',
    marginTop: '5px',
  },
}

const Input = ({ style, className, name, value, onChange, type, propType }) => {
  return (
    <div style={{ ...innerStyle.container, ...style }} className={className}>
      <label htmlFor={name}>
        {name} <small>({propType})</small>
      </label>
      <input
        id={name}
        type={type}
        value={value}
        checked={value}
        onChange={onChange}
        style={innerStyle.input}
      />
    </div>
  )
}

Input.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
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
