import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import NavButton from '../navButton'
import styles from './navbar.styles'

const Navbar = ({ style, className }) => {
  return (
    <nav style={style} className={merge(styles.layout, className)}>
      <div className={styles.title}>
        react-workbench
      </div>
      <div className={styles.navActions}>
        <NavButton label="workbench" route="/" />
        <NavButton label="documentation" route="/documentation" />
      </div>
    </nav>
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
