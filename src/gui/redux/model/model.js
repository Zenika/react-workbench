import { keyValue } from 'trampss-redux-factory'
import { mapAction, mapPayload } from 'trampss-redux-factory/helpers'

import { docgenToModel, convertFromGuiValue } from '../utils/docgen.js'

// Middleware transforming DOCGEN action to MODEL action
const docgenMapper = (action) => {
  if (action.type === '@trampss/SET_DOCGEN') {
    return {
      type: '@trampss/SET_MODEL',
      payload: docgenToModel(action.payload),
    }
  }
  return action
}

// Middleware applying value convertion when model is updated
const updateMapper = payload => ({
  ...payload,
  value: convertFromGuiValue(payload.value, payload.type),
})

const middlewares = {
  pre: [mapAction(docgenMapper), mapPayload(/UPDATE_MODEL/)(updateMapper)],
}

export default keyValue(middlewares)({ key: 'name', name: 'model' })
