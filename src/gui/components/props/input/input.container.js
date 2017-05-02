import { connect } from 'react-redux'
import { setValue } from '../../../redux/model'
import Input from './input'

const getType = (type) => {
  switch (type) {
    case 'bool': return 'checkbox'
    default: return 'text'
  }
}

const getValue = (type, e) => {
  switch (type) {
    case 'checkbox': return e.target.checked
    default: return e.target.value
  }
}

const mapState = ({ model }, { name }) => {
  const { value, type } = model[name]

  return {
    value,
    type: getType(type),
  }
}

const mapDispatch = (dispatch, { name }) => ({
  onChange: type => event => dispatch(setValue(name, getValue(type, event))),
})

const merge = (state, dispatch, props) => ({
  ...state,
  ...dispatch,
  onChange: dispatch.onChange(state.type),
  ...props,
})

export default connect(mapState, mapDispatch, merge)(Input)
