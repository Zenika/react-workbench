import { connect } from 'react-redux'
import Props from './props'
import { getPropsKeys } from '../../../../redux/docgen'

const mapState = state => ({
  properties: getPropsKeys(state),
})

export default connect(mapState)(Props)
