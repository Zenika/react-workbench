import React from 'react'
import PropTypes from 'prop-types'

const Navbar = ({ style, className }) => {
  return (
    <div style={style} className={className}>
      Workbench
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
