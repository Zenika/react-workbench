export const SET_MODEL = 'SET_MODEL'
export const setModel = model => ({ type: SET_MODEL, payload: model })

export const SET_VALUE = 'SET_VALUE'
export const setValue = (name, value) => ({ type: SET_VALUE, payload: { name, value } })
