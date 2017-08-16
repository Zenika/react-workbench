import { createSelector } from 'reselect'

import model from './model'
import { convertToGuiValue } from '../utils/docgen'

const getModelData = state => model.get()(state)

const getModelArray = state => model.getAsArray(state)

const getComponentValue = (name, type) =>
  createSelector(getModelData, data => convertToGuiValue(data[name].value, type))

const getComponentProps = createSelector(getModelArray, array =>
  array.map(p => ({ [p.name]: p.value })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
)

export { getComponentProps, getComponentValue }
