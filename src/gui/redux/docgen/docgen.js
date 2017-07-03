import {
  REQUEST_DOCGEN,
  RECEIVED_DOCGEN,
  RECEIVED_EMPTY_DOCGEN,
  FAILED_DOCGEN,
} from './docgen.actions'

export const initialState = {
  loaded: false,
  data: {},
}

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case REQUEST_DOCGEN:
      return { ...initialState, loaded: false }
    case RECEIVED_DOCGEN:
      return { data: payload, loaded: true }
    case RECEIVED_EMPTY_DOCGEN:
    case FAILED_DOCGEN:
      return { ...initialState, loaded: true }
    default:
      return state
  }
}
