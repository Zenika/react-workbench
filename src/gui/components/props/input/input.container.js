import { connect } from 'react-redux'
import { getComponentValue, UPDATE_VALUE } from '../../../redux/model'
import { getProp } from '../../../redux/docgen'
import Input from './input'

const getInputType = (type) => {
  switch (type) {
    case 'bool':
      return 'checkbox'
    default:
      return 'text'
  }
}

const convertToGuiValue = (type, value) => {
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

const convertFromGuiValue = (value, type) => {
  switch (type) {
    case 'bool':
      return !!value
    case 'object':
      return eval(`Object(${value})`) // eslint-disable-line no-eval
    case 'array':
    case 'func':
      return eval(value) // eslint-disable-line no-eval
    default:
      return value
  }
}

const getValueFromEvent = (input, event, type) => {
  switch (input) {
    case 'checkbox':
      return convertFromGuiValue(event.target.checked, type)
    default:
      return convertFromGuiValue(event.target.value, type)
  }
}

const mapState = (state, { name }) => {
  const { type } = getProp(name)(state)
  const value = getComponentValue(name)(state)
  return {
    value: convertToGuiValue(type.name, value),
    type: type.name,
    inputType: getInputType(type.name),
  }
}

const mapDispatch = (dispatch, { name }) => ({
  onChange: (input, type) => event =>
    dispatch({
      type: UPDATE_VALUE,
      payload: {
        name,
        value: getValueFromEvent(input, event, type),
      },
    }),
})

const merge = (state, dispatch, props) => ({
  ...state,
  ...dispatch,
  onChange: dispatch.onChange(state.inputType, state.type),
  ...props,
})

export default connect(mapState, mapDispatch, merge)(Input)
