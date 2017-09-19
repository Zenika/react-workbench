import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'
import WrappedComponent from '../../component.container'
import Sidebar from './sidebar'
import styles from './workbench.styles'

const Workbench = ({ className }) => {
  return (
    <div className={merge(styles.layout, className)}>
      <div id="component" className={styles.content}>
        <WrappedComponent />
      </div>

      <Sidebar className={styles.sidebar} />
    </div>
  )
}

Workbench.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Workbench.defaultProps = {
  className: undefined,
}

export default Workbench
