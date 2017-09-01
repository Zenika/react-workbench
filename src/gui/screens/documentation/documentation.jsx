import React from 'react'
import PropTypes from 'prop-types'
import router from 'hoc-little-router'

import { Tabs, Tab } from '../../components/tabs'
import Actions from './actions'
import Edit from './edit'
import Preview from './preview'

const Documentation = ({ className }) => {
  return (
    <Tabs className={className} actions={<Actions />}>
      <Tab tabKey="edit" title="edit">
        <Edit />
      </Tab>
      <Tab tabKey="preview" title="preview">
        <Preview />
      </Tab>
    </Tabs>
  )
}

Documentation.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Documentation.defaultProps = {
  className: undefined,
}

export default router('DOCUMENTATION')(Documentation)
