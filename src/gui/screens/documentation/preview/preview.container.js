import { connect } from 'react-redux'
import loader from 'hoc-react-loader'

import { fetchDocumentation, getDocumentationData, isLoading } from '../../../redux/documentation'
import Preview from './preview'

const mapState = state => ({
  loaded: !isLoading(state),
  html: getDocumentationData(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchDocumentation('html')),
})

const loadable = loader()(Preview)

export default connect(mapState, mapDispatch)(loadable)
