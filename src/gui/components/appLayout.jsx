import React from 'react'

import Navbar from './common/navbar'
import Workbench from './workbench'
import Documentation from './documentation'
import styles from './appLayout.styles'

const AppLayout = () => {
  return (
    <div className={styles.layout} >
      <Navbar />
      <Workbench />
      <Documentation />
    </div>
  )
}

export default AppLayout
