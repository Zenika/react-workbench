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
    const titles = childArray.map((c, index) => ({ key: index, title: c.props.title }))
    const selectedTab = childArray[this.state.selected]

    return (
      <div className={merge(styles.layout, className)}>
        <TabsHeader
          titles={titles}
          selectedTab={this.state.selected}
          onSelectTab={this.handleSelectedTab}
          className={headersClassName}
        />
        <TabsAction actions={actions} className={actionsClassName} />
        {selectedTab}
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
  defaultKey: 0,
  actions: undefined,
  className: undefined,
  actionsClassName: undefined,
  headersClassName: undefined,
}

export default Tabs
