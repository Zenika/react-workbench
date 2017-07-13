import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import TabsHeader from './tabsHeader'
import TabsAction from './tabsActions'
import styles from './tabs.styles'

class Tabs extends Component {
  state = {
    selected: this.props.defaultKey,
  }

  handleSelectedTab = (key) => {
    this.setState(() => ({ selected: key }))
  }

  render() {
    const { children, actions, className, actionsClassName, headersClassName } = this.props

    const childArray = React.Children.toArray(children)
    const headers = childArray.map(({ props }) => ({ tabKey: props.tabKey, title: props.title }))
    const selected = this.state.selected || headers[0].tabKey
    const tab = childArray.find(c => c.props.tabKey === selected)

    return (
      <div className={merge(styles.layout, className)}>
        <TabsHeader
          headers={headers}
          selectedTab={selected}
          onSelectTab={this.handleSelectedTab}
          className={headersClassName}
        />
        <TabsAction actions={actions} className={actionsClassName} />
        {tab}
      </div>
    )
  }
}

Tabs.propTypes = {
  defaultKey: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  actionsClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  headersClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Tabs.defaultProps = {
  defaultKey: undefined,
  actions: undefined,
  className: undefined,
  actionsClassName: undefined,
  headersClassName: undefined,
}

export default Tabs
