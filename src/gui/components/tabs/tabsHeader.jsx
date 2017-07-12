import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import styles from './tabsHeader.styles'

const TabsHeader = ({ titles, selectedTab, onSelectTab, className }) => {
  return (
    <ul className={merge(styles.layout, className)}>
      {titles.map(({ key, title }) =>
        <li
          key={key}
          className={merge(styles.item, selectedTab === key && styles.selected)}
          aria-expanded={selectedTab === key}
          onClick={() => onSelectTab(key)}
        >
          {title}
        </li>
      )}
    </ul>
  )
}

TabsHeader.propTypes = {
  selectedTab: PropTypes.number.isRequired,
  titles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectTab: PropTypes.func.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

TabsHeader.defaultProps = {
  className: undefined,
}

export default TabsHeader
