import {
  REQUEST_DOCGEN,
  RECEIVED_DOCGEN,
  RECEIVED_EMPTY_DOCGEN,
  FAILED_DOCGEN,
} from './docgen.actions'

export const EMPTY_DOCGEN = {}
export const LOADING_DOCGEN = {}

export default (state = EMPTY_DOCGEN, { type, payload } = {}) => {
  switch (type) {
    case REQUEST_DOCGEN:
      return LOADING_DOCGEN
    case RECEIVED_DOCGEN:
      return payload
    case RECEIVED_EMPTY_DOCGEN:
      return EMPTY_DOCGEN
    case FAILED_DOCGEN:
      return EMPTY_DOCGEN
    default:
      return state
  }
}
