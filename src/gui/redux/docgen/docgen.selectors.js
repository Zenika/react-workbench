import { createSelector } from 'reselect'
import { LOADING_DOCGEN } from './docgen'

const getDocgen = state => state.docgen

const isLoading = createSelector(getDocgen, docgen => docgen === LOADING_DOCGEN)

const getProps = createSelector(getDocgen, docgen => docgen.props || {})

const getPropsKeys = createSelector(getProps, props => Object.keys(props))

const getProp = name => createSelector(getProps, props => props[name])

export { getDocgen, isLoading, getProps, getPropsKeys, getProp }
