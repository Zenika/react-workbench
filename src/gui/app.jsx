import React from 'react'

import Navbar from './components/navbar'
import Workbench from './screens/workbench'
import Documentation from './screens/documentation'
import styles from './app.styles'

const App = () => {
  return (
    <div className={styles.layout} >
      <Navbar />
      <Workbench className={styles.main} />
      <Documentation className={styles.main} />
    </div>
  )
}

export default App
