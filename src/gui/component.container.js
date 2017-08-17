import { connect } from 'react-redux'
import { getComponentProps } from './redux/model'
import Component from './component.jsx'

const mapState = state => ({ ...getComponentProps(state) })

export default connect(mapState)(Component)
