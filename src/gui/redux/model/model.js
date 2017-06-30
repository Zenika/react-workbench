import { RECEIVED_DOCGEN } from '../docgen'
import { docgenToModel, convertGuiValue } from '../utils/docgen.js'

export const UPDATE_VALUE = 'UPDATE_VALUE'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case RECEIVED_DOCGEN:
      return docgenToModel(payload)
    case UPDATE_VALUE: {
      const old = state[payload.name]
      return {
        ...state,
        [payload.name]: {
          ...old,
          value: convertGuiValue(payload.value, old.type),
        },
      }
    }
    default:
      return state
  }
}
