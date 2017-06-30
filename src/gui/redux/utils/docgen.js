const convertGuiValue = (value, type) => {
  switch (type) {
    case 'bool':
      return !!value
    case 'object':
      return eval(`Object(${value})`) // eslint-disable-line no-eval
    case 'array':
    case 'func':
      return eval(value) // eslint-disable-line no-eval
    default:
      return value
  }
}

const convertDocgenValue = (value, type) => {
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

const docgenToModel = (docgen) => {
  return Object.keys(docgen.props || {}).reduce((obj, key) => {
    const prop = docgen.props[key]
    const type = prop.type && prop.type.name
    const value = prop.defaultValue && prop.defaultValue.value
    return { ...obj, [key]: convertDocgenValue(value, type) }
  }, {})
}

export { convertDocgenValue, convertGuiValue, docgenToModel }
