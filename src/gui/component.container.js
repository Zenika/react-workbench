import { connect } from 'react-redux'
import { getModel } from './redux/model'
import Component from './component.js'

const mapState = state => ({ ...getModel(state) })

export default connect(mapState)(Component)
