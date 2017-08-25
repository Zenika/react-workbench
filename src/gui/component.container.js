import { connect } from 'react-redux'
import { getComponentProps } from './redux/component/props'
import { state as stateStore } from './redux/component'
import Component from './component'

const mapState = state => ({ ...getComponentProps(state), state: stateStore.get()(state) })

const mapDispatch = dispatch => ({
  setState: state => dispatch(stateStore.set(state)),
})

export default connect(mapState, mapDispatch)(Component)
