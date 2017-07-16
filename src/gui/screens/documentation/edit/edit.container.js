import { connect } from 'react-redux'
import loader from 'hoc-react-loader'

import { fetchDocumentation, getDocumentationData, isLoading } from '../../../redux/documentation'
import Edit from './edit'

const mapState = state => ({
  loaded: !isLoading(state),
  markdown: getDocumentationData(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchDocumentation()),
})

const loadable = loader()(Edit)

export default connect(mapState, mapDispatch)(loadable)
