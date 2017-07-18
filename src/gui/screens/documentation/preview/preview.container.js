import { connect } from 'react-redux'
import loader from 'hoc-react-loader'

import documentation, { fetchDocumentation } from '../../../redux/documentation'
import Preview from './preview'

const mapState = state => ({
  loaded: documentation.isInitialized(state),
  html: documentation.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchDocumentation('html')),
})

const loadable = loader()(Preview)

export default connect(mapState, mapDispatch)(loadable)
