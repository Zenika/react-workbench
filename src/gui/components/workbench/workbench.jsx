import React from 'react'
import PropTypes from 'prop-types'

import Navbar from '../navbar'
import Props from '../props'
import styles from './workbench.styles'

const Workbench = ({ children }) => {
  return (
    <div className={styles.layout} >
      <Navbar className={styles.header} />
      <Props className={styles.sidebar} />
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}

Workbench.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Workbench
