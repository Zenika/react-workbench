import model from './model'
import { convertToGuiValue } from '../utils/docgen'

const getComponentValue = (name, type) => state =>
  convertToGuiValue(model.get(name)(state).value, type)

const getComponentProps = state =>
  model
    .getAsArray(state)
    .map(p => ({ [p.name]: p.value }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})

export { getComponentProps, getComponentValue }
