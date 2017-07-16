import React from 'react'
import PropTypes from 'prop-types'
import router from 'hoc-little-router'

import { Tabs, Tab } from '../../components/tabs'
import Edit from './edit'
import Preview from './preview'

const Documentation = ({ content, className }) => {
  return (
    <Tabs className={className}>
      <Tab tabKey="edit" title="edit">
        <Edit markdown={content} />
      </Tab>
      <Tab tabKey="preview" title="preview">
        <Preview html={content} />
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

export default router('DOCUMENTATION')(Documentation)
