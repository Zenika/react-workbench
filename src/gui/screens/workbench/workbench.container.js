import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import router from 'hoc-little-router'
import { docgen } from '../../redux/reducers'
import { fetch } from '../../redux/api'
import Component from './workbench'

const mapState = state => ({
  loaded: docgen.isInitialized(state),
})

const mapDispatch = dispatch => ({
  load: () => {
    dispatch(fetch.docgen())
    dispatch(fetch.states())
  },
})

const loadable = loader()(Component)
const routed = router('WORKBENCH', { absolute: true })(loadable)

export default connect(mapState, mapDispatch)(routed)
