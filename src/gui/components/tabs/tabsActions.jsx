import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import styles from './tabsActions.styles'

const TabsActions = ({ actions, className }) => {
  if (!actions) {
    return null
  }
  return (
    <div className={merge(styles.layout, className)}>
      {actions}
    </div>
  )
}

TabsActions.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

TabsActions.defaultProps = {
  actions: undefined,
  className: undefined,
}

export default TabsActions
