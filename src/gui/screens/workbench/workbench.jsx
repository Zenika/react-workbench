import React from 'react'

import Props from './props'
import styles from './workbench.styles'

import { Tabs, Tab } from '../../components/tabs'
import WrappedComponent from '../../component.container'

const Workbench = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <WrappedComponent />
      </div>
      <Tabs className={styles.sidebar}>
        <Tab title="props"><Props /></Tab>
        <Tab title="state">Not implemented yet.</Tab>
      </Tabs>
    </div>
  )
}

export default Workbench
