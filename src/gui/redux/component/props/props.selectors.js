import { createSelector } from 'reselect'

import props from './props'
import { convertToGuiValue } from '../../utils/docgen'

const getPropsData = state => props.get()(state)

const getPropsAsArray = state => props.getAsArray(state)

const getComponentValue = (name, type) =>
  createSelector(getPropsData, data => convertToGuiValue(data[name].value, type))

const getComponentProps = createSelector(getPropsAsArray, array =>
  array.map(p => ({ [p.name]: p.value })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
)

export { getComponentProps, getComponentValue }
