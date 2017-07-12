import {
  REQUEST_DOCUMENTATION,
  RECEIVED_DOCUMENTATION,
  RECEIVED_EMPTY_DOCUMENTATION,
  FAILED_DOCUMENTATION,
} from './documentation.actions'

export const initialState = {
  loaded: false,
  data: {},
}

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case REQUEST_DOCUMENTATION:
      return { ...initialState, loaded: false }
    case RECEIVED_DOCUMENTATION:
      return { data: payload, loaded: true }
    case RECEIVED_EMPTY_DOCUMENTATION:
    case FAILED_DOCUMENTATION:
      return { ...initialState, loaded: true }
    default:
      return state
  }
}
