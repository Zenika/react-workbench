import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import router from 'hoc-little-router'
import docgen, { fetchDocgen } from '../../redux/docgen'
import Workbench from './workbench'

const mapState = state => ({
  loaded: docgen.isInitialized(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchDocgen()),
})

const loadable = loader()(Workbench)
const routed = router('WORKBENCH', { absolute: true })(loadable)

export default connect(mapState, mapDispatch)(routed)
