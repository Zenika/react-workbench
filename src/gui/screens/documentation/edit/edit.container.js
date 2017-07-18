import { connect } from 'react-redux'
import loader from 'hoc-react-loader'

import documentation, { fetchDocumentation } from '../../../redux/documentation'
import Edit from './edit'

const mapState = state => ({
  loaded: documentation.isInitialized(state),
  markdown: documentation.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchDocumentation('markdown')),
})

const loadable = loader()(Edit)

export default connect(mapState, mapDispatch)(loadable)
