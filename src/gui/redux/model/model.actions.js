export const SET_MODEL = 'SET_MODEL'
export const setModel = model => ({ type: SET_MODEL, payload: model })

export const SET_VALUE = 'SET_VALUE'
export const setValue = (name, value) => ({ type: SET_VALUE, payload: { name, value } })

const getDocgenValue = (value, type) => {
  switch (type) {
    case 'bool':
      return value === 'true'
    case 'object':
      return eval(`Object(${value})`) // eslint-disable-line no-eval
    case 'symbol':
      return value
    default:
      return eval(value) // eslint-disable-line no-eval
  }
}

export const fetchModel = () => (dispatch) => {
  fetch('/api/docgen').then(response => response.json()).then((json) => {
    if (json && json.length > 0) {
      dispatch(
        setModel(
          Object.keys(json[0].props || {}).reduce((obj, key) => {
            const prop = json[0].props[key]
            const type = prop.type && prop.type.name
            const value = prop.defaultValue && prop.defaultValue.value

            return {
              ...obj,
              [key]: {
                value: getDocgenValue(value, type),
                type,
              },
            }
          }, {})
        )
      )
    }
  })
}
