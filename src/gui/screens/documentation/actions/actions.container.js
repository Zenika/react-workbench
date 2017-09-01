import { connect } from 'react-redux'
import Actions from './actions'

const mapDispatch = dispatch => ({
  onSave: () => dispatch({ type: 'UI_CLICK_SAVE_README' }),
})

export default connect(undefined, mapDispatch)(Actions)
