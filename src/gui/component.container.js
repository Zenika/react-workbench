import { connect } from 'react-redux'
import Component from './component.js'

const mapState = state => ({
  ...Object.keys(state.model).reduce(
    (acc, next) => ({ ...acc, [next]: state.model[next].value }),
    {}
  ),
})

export default connect(mapState)(Component)
