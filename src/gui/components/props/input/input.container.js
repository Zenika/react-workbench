import { connect } from 'react-redux'
import { getComponentValue, UPDATE_VALUE } from '../../../redux/model'
import { getProp } from '../../../redux/docgen'
import Input from './input'

const getType = (type) => {
  switch (type) {
    case 'bool':
      return 'checkbox'
    default:
      return 'text'
  }
}

const getValue = (type, value) => {
  switch (type) {
    case 'array':
    case 'object':
      return JSON.stringify(value)
    case 'func':
      return eval(value) // eslint-disable-line no-eval
    default:
      return value
  }
}

const getValueFromEvent = (type, e) => {
  switch (type) {
    case 'checkbox':
      return e.target.checked
    default:
      return e.target.value
  }
}

const mapState = (state, { name }) => {
  const { type } = getProp(name)(state)
  const value = getComponentValue(name)(state)
  return {
    value: getValue(type, value),
    type: getType(type),
  }
}

const mapDispatch = (dispatch, { name }) => ({
  onChange: type => event =>
    dispatch({
      type: UPDATE_VALUE,
      payload: {
        name,
        value: getValueFromEvent(type, event),
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
