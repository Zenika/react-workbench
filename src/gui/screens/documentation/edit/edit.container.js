import { connect } from 'react-redux'
import { readme } from '../../../redux/documentation'
import Component from './edit'

const mapState = state => ({
  markdown: readme.get()(state),
})

const mapDispatch = dispatch => ({
  onChange: e => dispatch(readme.set(e.target.value)),
})

export default connect(mapState, mapDispatch)(Component)
