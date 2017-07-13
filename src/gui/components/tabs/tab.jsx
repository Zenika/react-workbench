import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import styles from './tab.styles'

const Tab = ({ tabKey, title, className, children }) => {
  return (
    <div className={merge(styles.layout, className)} aria-hidden={tabKey} aria-label={title}>
      {children}
    </div>
  )
}

Tab.propTypes = {
  tabKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
}

Tab.defaultProps = {
  children: '',
  className: undefined,
}

export default Tab
