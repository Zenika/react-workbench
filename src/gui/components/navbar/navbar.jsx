import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Navbar = ({ style, className }) => {
  return (
    <div style={style} className={classnames(className)}>
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
