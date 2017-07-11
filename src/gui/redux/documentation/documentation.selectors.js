import { createSelector } from 'reselect'

const getDocumentation = state => state.documentation

const getDocumentationData = createSelector(getDocumentation, doc => doc.data)

const isLoading = createSelector(getDocumentation, doc => !doc.loaded)

export { getDocumentation, getDocumentationData, isLoading }
