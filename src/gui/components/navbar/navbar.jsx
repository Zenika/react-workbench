import React from 'react'
import PropTypes from 'prop-types'

import container, { title } from './navbar.styles'

const Navbar = ({ style, className }) => {
  return (
    <div style={style} className={`${container} ${className}`}>
      <div className={`${title}`}>
        react-workbench
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
