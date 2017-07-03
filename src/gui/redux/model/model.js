import { RECEIVED_DOCGEN } from '../docgen'
import { docgenToModel } from '../utils/docgen.js'

export const UPDATE_VALUE = 'UPDATE_VALUE'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case RECEIVED_DOCGEN:
      return docgenToModel(payload)
    case UPDATE_VALUE: {
      return { ...state, [payload.name]: payload.value }
    }
    default:
      return state
  }
}
