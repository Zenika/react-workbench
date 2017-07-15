import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import { Tabs, Tab } from '../../components/tabs'
import styles from './documentation.styles'

const Documentation = ({ content, className }) => {
  return (
    <Tabs className={merge(styles.layout, className)}>
      <Tab tabKey="edit" title="edit">
        <textarea className={styles.edit}>
          {content}
        </textarea>
      </Tab>
      <Tab tabKey="preview" title="preview">
        {content}
      </Tab>
    </Tabs>
  )
}

Documentation.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Documentation.defaultProps = {
  className: undefined,
}

export default Documentation
