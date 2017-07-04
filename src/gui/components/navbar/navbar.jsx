import React from 'react'
import PropTypes from 'prop-types'

import styles from './navbar.styles'

const Navbar = ({ style, className }) => {
  return (
    <div style={style} className={`${styles} ${className}`}>
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
