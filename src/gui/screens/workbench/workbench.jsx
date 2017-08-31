import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'
import { Tabs, Tab } from '../../components/tabs'
import WrappedComponent from '../../component.container'
import Props from './props'
import State from './state'
import styles from './workbench.styles'

const Workbench = ({ className }) => {
  return (
    <div className={merge(styles.layout, className)}>
      <div id="component" className={styles.content}>
        <WrappedComponent />
      </div>
      <Tabs className={styles.sidebar}>
        <Tab tabKey="props" title="props"><Props /></Tab>
        <Tab tabKey="state" title="state"><State /></Tab>
      </Tabs>
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
