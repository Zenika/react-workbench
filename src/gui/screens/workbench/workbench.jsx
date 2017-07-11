import React from 'react'

import Props from './props'
import styles from './workbench.styles'
import WrappedComponent from '../../component.container'

const Workbench = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <WrappedComponent />
      </div>
      <Props className={styles.sidebar} />
    </div>
  )
}

export default Workbench
