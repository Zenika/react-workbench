import { createSelector } from 'reselect'

const getDocgen = state => state.docgen

const getDocgenData = createSelector(getDocgen, docgen => docgen.data)

const isLoading = createSelector(getDocgen, docgen => !docgen.loaded)

const getProps = createSelector(getDocgenData, data => data.props || {})

const getPropsKeys = createSelector(getProps, props => Object.keys(props))

const getProp = name => createSelector(getProps, props => props[name])

export { getDocgen, isLoading, getProps, getPropsKeys, getProp }
