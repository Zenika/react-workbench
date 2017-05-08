import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Navbar from './navbar'
import Props from './props'
import styles from './workbench.styles.scss'

const Workbench = ({ style, className, children }) => {
  return (
    <div className={classnames(styles.workbench, className)} style={style}>
      <Navbar />
      <div className={styles.workbenchLayout}>
        <div>{children}</div>
        <Props />
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
