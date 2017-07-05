import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../navbar'
import Props from '../props'

import container, { header, main, sidebar } from './workbench.styles'

const Workbench = ({ style, className, children }) => {
  return (
    <div className={`${container} ${className}`} style={style}>
      <Navbar className={`${header}`} />
      <Props className={`${sidebar}`} />
      <div className={`${main}`}>
        {children}
      </div>
    </div>
  )
}

Workbench.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Workbench.defaultProps = {
  style: {},
  className: '',
}

export default Workbench
