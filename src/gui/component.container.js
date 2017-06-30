import { connect } from 'react-redux'
import Component from './component.js'

const mapState = state => ({ ...state.model })

export default connect(mapState)(Component)
