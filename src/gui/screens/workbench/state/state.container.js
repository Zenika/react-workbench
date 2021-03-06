import { connect } from 'react-redux'
import { state as stateStore } from '../../../redux/ui'
import Component from './state'

export const mapState = state => ({ state: stateStore.get()(state) })

export const mapDispatch = dispatch => ({
  onChange: e => dispatch(stateStore.set(e.target.value)),
  setState: () => dispatch({ type: 'UI_CLICK_SET_STATE' }),
})

export default connect(mapState, mapDispatch)(Component)
