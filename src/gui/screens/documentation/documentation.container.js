import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import router from 'hoc-little-router'

import { fetchDocumentation, getDocumentationData, isLoading } from '../../redux/documentation'
import Documentation from './documentation'

const mapState = state => ({
  loaded: !isLoading(state),
  content: getDocumentationData(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchDocumentation()),
})

const loadable = loader()(Documentation)
const routed = router('DOCUMENTATION')(loadable)

export default connect(mapState, mapDispatch)(routed)
