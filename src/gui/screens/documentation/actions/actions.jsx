import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForPropTypes } from 'recompose'
import SaveButton from '../../../components/button'

const Actions = ({ onSave }) => <SaveButton label="Save" onClick={onSave} />

Actions.propTypes = {
  onSave: PropTypes.func.isRequired,
}

export default onlyUpdateForPropTypes(Actions)
