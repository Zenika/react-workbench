import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Navbar from './navbar'
import Props from './props'
import styles from './workbench.styles'

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
