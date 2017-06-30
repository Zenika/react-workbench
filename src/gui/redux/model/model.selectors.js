import { createSelector } from 'reselect'

const getModel = state => state.model

const getComponentValue = name => createSelector(getModel, model => model[name])

export { getModel, getComponentValue }
