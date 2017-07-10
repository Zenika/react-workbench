import { connect } from 'react-redux'
import { push } from 'redux-little-router'

import Button from '../button'

const mapDispatch = (dispatch, props) => ({
  onClick: () => dispatch(push(props.route)),
})

export default connect(undefined, mapDispatch)(Button)
