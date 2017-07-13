import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import styles from './tabsHeader.styles'

class TabsHeader extends Component {

  handleSelectedTab = tabKey => () => {
    this.props.onSelectTab(tabKey)
  }

  render() {
    const { headers, selectedTab, className } = this.props
    return (
      <ul className={merge(styles.layout, className)}>
        {headers.map(({ tabKey, title }) =>
          <li
            key={tabKey}
            className={merge(styles.item, selectedTab === tabKey && styles.selected)}
            aria-expanded={selectedTab === tabKey}
            onClick={this.handleSelectedTab(tabKey)}
          >
            {title}
          </li>
        )}
      </ul>
    )
  }
}

TabsHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  onSelectTab: PropTypes.func.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

TabsHeader.defaultProps = {
  className: undefined,
}

export default TabsHeader
