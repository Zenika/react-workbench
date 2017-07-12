import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import router from 'hoc-little-router'

import documentation, { fetchDocumentation } from '../../redux/documentation'
import Documentation from './documentation'

const mapState = state => ({
  loaded: documentation.isInitialized(state),
  content: documentation.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchDocumentation()),
})

const loadable = loader()(Documentation)
const routed = router('DOCUMENTATION')(loadable)

export default connect(mapState, mapDispatch)(routed)
