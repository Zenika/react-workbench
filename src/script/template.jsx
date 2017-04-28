import app from '../src/gui/app'
// eslint-disable-next-line import/no-absolute-path,import/first
import Component from '/* react-workbench-insert import */'

const getDocgenValue = (value, type) => {
  switch (type) {
    case 'bool': return value === 'true'
    case 'object': return eval(`Object(${value})`) // eslint-disable-line no-eval
    default: return value
  }
}

const model = Object.keys(Component.__docgenInfo.props) // eslint-disable-line no-underscore-dangle
  .reduce(
    (acc, next) => {
      const prop = Component.__docgenInfo.props[next]  // eslint-disable-line no-underscore-dangle
      const type = prop.type.name

      return {
        ...acc,
        [next]: {
          value: getDocgenValue(prop.defaultValue && prop.defaultValue.value, type),
          type,
        },
      }
    },
    {},
  )

app(Component, model)
