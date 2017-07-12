import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import styles from './tab.styles'

const Tab = ({ title, className, children }) => {
  return (
    <div className={merge(styles.layout, className)} aria-hidden={title}>
      {children}
    </div>
  )
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
}

Tab.defaultProps = {
  children: '',
  className: undefined,
}

export default Tab
