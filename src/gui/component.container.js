import { connect } from 'react-redux'
import { getComponentProps } from './redux/model'
import Component from './component.js'

const mapState = state => ({ ...getComponentProps(state) })

export default connect(mapState)(Component)
