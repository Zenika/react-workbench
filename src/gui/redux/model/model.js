import { SET_MODEL, SET_VALUE } from './model.actions'

const getValue = (value, type) => {
  switch (type) {
    case 'bool': return !!value
    case 'object': return eval(`Object(${value})`) // eslint-disable-line no-eval
    case 'array':
    case 'func': return eval(value) // eslint-disable-line no-eval
    default: return value
  }
}

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SET_MODEL: return payload
    case SET_VALUE: {
      const old = state[payload.name]
      return {
        ...state,
        [payload.name]: {
          ...old,
          value: getValue(payload.value, old.type),
        },
      }
    }
    default: return state
  }
}
