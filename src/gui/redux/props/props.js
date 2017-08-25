import { keyValue } from 'trampss-redux-factory'
import { mapAction, mapPayload } from 'trampss-redux-factory/helpers'
import { docgenToProps, convertFromGuiValue } from '../utils/docgen.js'

// Middleware transforming DOCGEN action to PROPS action
const docgenMapper = (action) => {
  if (action.type === '@trampss/SET_DOCGEN') {
    return {
      type: '@trampss/SET_PROPS',
      payload: docgenToProps(action.payload),
    }
  }
  return action
}

// Middleware applying value convertion when props is updated
const updateMapper = payload => ({
  ...payload,
  value: convertFromGuiValue(payload.value, payload.type),
})

const middlewares = {
  pre: [mapAction(docgenMapper), mapPayload(/UPDATE_PROPS/)(updateMapper)],
}

export default keyValue(middlewares)({ path: 'component', key: 'name', name: 'props' })
