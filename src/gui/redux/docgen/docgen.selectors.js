import { createSelector } from 'reselect'
import { docgen } from '../reducers'

const getProps = state => docgen.get()(state).props || {}
export const getPropsKeys = createSelector(getProps, p => Object.keys(p))
export const getProp = name => createSelector(getProps, p => p[name])
