import React from 'react'
import PropTypes from 'prop-types'
import Input from './input'

const Props = ({ style, className, properties }) => {
  return (
    <div style={style} className={className}>
      { properties.map(prop => <Input key={prop} name={prop} />) }
    </div>
  )
}

Props.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  properties: PropTypes.array,
}

Props.defaultProps = {
  style: {},
  className: '',
  properties: [],
}

export default Props
