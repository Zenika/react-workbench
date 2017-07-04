import React from 'react'
import PropTypes from 'prop-types'
import Input from './input'

const innerStyle = {
  content: {
    backgroundColor: '#263248',
    color: '#7E8AA2',
    fontSize: '0.8em',
    padding: '10px',
    width: '180px',
    overflow: 'auto',
  },
}

const Props = ({ style, className, properties }) => {
  return (
    <div style={{ ...innerStyle.content, ...style }} className={className}>
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
