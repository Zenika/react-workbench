import React from 'react'
import router from 'hoc-little-router'

import styles from './documentation.styles'

const Documentation = () => {
  return (
    <div className={styles.layout}>
      Documentation
    </div>
  )
}

export default router('DOCUMENTATION', { absolute: true })(Documentation)
