import factory from 'trampss-redux-factory'
import { mapAction, mapPayload } from 'trampss-redux-factory/helpers'

import { docgenToModel, convertFromGuiValue } from '../utils/docgen.js'

const docgenMapper = (action) => {
  if (action.type === '@trampss/SET_DOCGEN') {
    return {
      type: '@trampss/SET_MODEL',
      payload: docgenToModel(action.payload),
    }
  }
  return action
}

const updateMapper = payload => ({
  ...payload,
  value: convertFromGuiValue(payload.value, payload.type),
})

const middleware = {
  pre: [mapAction(docgenMapper), mapPayload(/UPDATE_MODEL/)(updateMapper)],
}

export default factory(middleware)({ key: 'name', name: 'model', type: 'map' })
