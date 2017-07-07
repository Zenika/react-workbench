export const UPDATE_PROP = 'UPDATE_PROP'

export const updateProp = (name, type, value) => ({
  type: UPDATE_PROP,
  payload: { name, type, value },
})
