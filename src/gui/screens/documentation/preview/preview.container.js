import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import { html } from '../../../redux'
import { fetch } from '../../../redux/api'
import Component from './preview'

const mapState = state => ({
  loaded: html.isInitialized(state),
  html: html.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetch.html()),
})

const loadable = loader()(Component)

export default connect(mapState, mapDispatch)(loadable)
