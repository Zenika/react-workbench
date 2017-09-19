import { connect } from 'react-redux'
import Component from './sidebar'
import { states } from '../../../redux/reducers'
import { stateName } from '../../../redux/ui'

const mapState = state => ({
  states: states.getKeys(state),
})

const mapDispatch = dispatch => ({
  onStateNameChange: e => dispatch(stateName.set(e.target.value)),
  onSave: () => dispatch({ type: 'UI_SAVE_STATE_CLICKED' }),
})

export default connect(mapState, mapDispatch)(Component)
