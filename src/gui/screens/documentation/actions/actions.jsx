import React from 'react'
import PropTypes from 'prop-types'

import SaveButton from '../../../components/button'

const Actions = ({ onSave }) => {
  return (
    <div>
      <SaveButton label="Save" onClick={onSave} />
    </div>
  )
}

Actions.propTypes = {
  onSave: PropTypes.func.isRequired,
}

export default Actions
