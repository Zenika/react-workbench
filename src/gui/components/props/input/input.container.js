import { connect } from 'react-redux'
import Input from './input'

const mapState = ({ model }, props) => ({
  defaultValue: model[props.name].defaultValue && model[props.name].defaultValue.value,
})

const mapDispatch = (dispatch, { name }) => ({
  onChange: value => dispatch({
    type: 'SET_STATE',
    payload: { [name]: value },
  }),
})

export default connect(mapState, mapDispatch)(Input)
