import { createSelector } from 'reselect'
import docgen from './docgen'

const getDocgen = state => docgen.get()(state) || {}

const getProps = createSelector(getDocgen, data => data.props || {})

const getPropsKeys = createSelector(getProps, props => Object.keys(props))

const getProp = name => createSelector(getProps, props => props[name])

export { getDocgen, getProps, getPropsKeys, getProp }
