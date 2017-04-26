import { connect } from 'react-redux'
import Props from './props'

const mapState = state => ({
  properties: Object.keys(state.model),
})

export default connect(mapState)(Props)
