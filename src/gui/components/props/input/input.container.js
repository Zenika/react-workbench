import { connect } from 'react-redux'
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
  const m = model[name]

  return {
    value: m.value,
    type: getType(m.type),
  }
}

const mapDispatch = (dispatch, { name }) => ({
  onChange: type => event => dispatch({
    type: 'SET_VALUE',
    payload: {
      name,
      value: getValue(type, event),
    },
  }),
})

const merge = (state, dispatch, props) => ({
  ...state,
  ...dispatch,
  onChange: dispatch.onChange(state.type),
  ...props,
})

export default connect(mapState, mapDispatch, merge)(Input)
