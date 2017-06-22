import app from './app'
import Component from './public/component.js'

const getDocgenValue = (value, type) => {
  switch (type) {
    case 'bool': return value === 'true'
    case 'object': return eval(`Object(${value})`) // eslint-disable-line no-eval
    case 'symbol': return value
    default: return eval(value)  // eslint-disable-line no-eval
  }
}

fetch('/api/docgen')
  .then(response => response.json())
  .then((json) => {
    if (json && json.length > 0) {
      app(
        Component,
        Object
          .keys(json[0].props || {})
          .reduce(
            (obj, key) => {
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
            },
            {},
          ),
      )
    }
  })