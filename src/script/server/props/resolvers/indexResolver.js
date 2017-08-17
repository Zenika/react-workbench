const utils = require('react-docgen/dist/utils')
const resolveHOC = require('react-docgen/dist/utils/resolveHOC').default

// FIXME not all cases of default exported elements managed
const indexResolver = (ast, recast) => {
  const exportDefaultIndex = (path) => {
    let resolvedPath = path
    // manage : 'export default XXX' (and with hoc)
    if (path.value.declaration) {
      resolvedPath = utils.resolveToValue(resolveHOC(path.get('declaration')))
      resolvedPath = utils.resolveToValue(resolvedPath.parentPath)
    }
    // by default manage : export { default } from './XXX'
    const importType = {
      path: resolvedPath.value.source.value,
    }
    throw importType
  }
  recast.visit(ast, {
    visitExportDefaultDeclaration: exportDefaultIndex,
    visitExportNamedDeclaration: exportDefaultIndex,
  })
}

module.exports = indexResolver
