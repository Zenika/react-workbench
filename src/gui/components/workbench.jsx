import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Navbar from './navbar'
import styles from './workbench'

const Workbench = ({ style, className, children }) => {
  return (
    <div className={classnames(styles.workbench, className)} style={style}>
      <Navbar />
      <div>
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
