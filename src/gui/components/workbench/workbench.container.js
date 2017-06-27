import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import { fetchModel } from '../../redux/model'
import Workbench from './workbench'

const mapState = () => ({
  loaded: true,
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchModel()),
})

const loadable = loader()(Workbench)

export default connect(mapState, mapDispatch)(loadable)
