import { createSelector } from 'reselect'
import { convertToGuiValue } from '../utils/docgen'

const getModel = state => state.model

const getComponentValue = (name, type) =>
  createSelector(getModel, model => convertToGuiValue(model[name], type))

export { getModel, getComponentValue }
