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

const docgenToProps = (docgen) => {
  return Object.keys(docgen.props || {}).map((key) => {
    const prop = docgen.props[key]
    const type = prop.type && prop.type.name
    const value = prop.defaultValue && prop.defaultValue.value
    return { name: key, value: convertDocgenValue(value, type) }
  })
}

const convertToGuiValue = (value, type) => {
  switch (type) {
    case 'array':
    case 'object':
      return JSON.stringify(value)
    case 'func':
      return eval(value) // eslint-disable-line no-eval
    default:
      return value
  }
}

const convertFromGuiValue = (value, type) => {
  switch (type) {
    case 'bool':
      return !!value
    case 'object':
      return eval(`Object(${value})`) // eslint-disable-line no-eval
    case 'array':
    case 'func':
      return eval(value) // eslint-disable-line no-eval
    case 'number':
      return Number(value)
    default:
      return value
  }
}

export { convertDocgenValue, docgenToProps, convertToGuiValue, convertFromGuiValue }
