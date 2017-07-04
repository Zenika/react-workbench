import React from 'react'
import PropTypes from 'prop-types'

const innerStyle = {
  header: {
    backgroundColor: '#263248',
    color: '#FFF',
    display: 'flex',
    height: '40px',
  },
  title: {
    width: '200px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9800',
  },
  titleText: {
    color: '#263248',
    fontSize: '1.2em',
  },
}

const Navbar = ({ style, className }) => {
  return (
    <div style={{ ...innerStyle.header, ...style }} className={className}>
      <div style={innerStyle.title}>
        <span style={innerStyle.titleText}>react-workbench</span>
      </div>
    </div>
  )
}

Navbar.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
}

Navbar.defaultProps = {
  style: {},
  className: '',
}

export default Navbar
