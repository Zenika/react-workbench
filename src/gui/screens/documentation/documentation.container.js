import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import { readme } from '../../redux/documentation'
import { fetch } from '../../redux/api'
import Component from './documentation'

const mapState = state => ({
  loaded: readme.isInitialized(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetch.readme()),
})

const loadable = loader()(Component)

export default connect(mapState, mapDispatch)(loadable)
