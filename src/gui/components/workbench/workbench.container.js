import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import { fetchDocgen, isLoading } from '../../redux/docgen'
import Workbench from './workbench'

const mapState = state => ({
  loaded: !isLoading(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchDocgen()),
})

const loadable = loader()(Workbench)

export default connect(mapState, mapDispatch)(loadable)
