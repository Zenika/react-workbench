import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import { primaryColor } from '../../styles'
import styles from './navbar.styles'

const Navbar = ({ style, className }) => {
  return (
    <div style={style} className={merge([styles.layout, primaryColor, className])}>
      <div className={styles.title}>
        react-workbench
      </div>
    </div>
  )
}

Navbar.propTypes = {
  style: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Navbar.defaultProps = {
  style: {},
  className: '',
}

export default Navbar
