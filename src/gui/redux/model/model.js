import { RECEIVED_DOCGEN } from '../docgen'
import { UPDATE_PROP } from './model.actions'
import { docgenToModel, convertFromGuiValue } from '../utils/docgen.js'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case RECEIVED_DOCGEN:
      return docgenToModel(payload)
    case UPDATE_PROP: {
      return { ...state, [payload.name]: convertFromGuiValue(payload.value, payload.type) }
    }
    default:
      return state
  }
}
