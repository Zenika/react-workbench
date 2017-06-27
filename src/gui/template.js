import { connect } from 'react-redux'
import { fetchModel } from './redux/model'
import Component from './component.js'

const mapState = state => ({
  loaded: false,
  ...Object.keys(state.model).reduce(
    (acc, next) => ({ ...acc, [next]: state.model[next].value }),
    {}
  ),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchModel()),
})

export default connect(mapState, mapDispatch)(Component)
