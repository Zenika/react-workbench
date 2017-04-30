const fs = require('fs')
const p = require('path')
const docgen = require('react-docgen')

const utils = require('react-docgen/dist/utils')
const resolveHOC = require('react-docgen/dist/utils/resolveHOC.js').default

const isComponentDefinition = (path) => {
  return utils.isReactCreateClassCall(path)
    || utils.isReactComponentClass(path)
    || utils.isStatelessComponent(path)
}

const resolveDefinition = (definition, types) => {
  if (utils.isReactCreateClassCall(definition)) {
    const resolvedPath = utils.resolveToValue(definition.get('arguments', 0))
    if (types.ObjectExpression.check(resolvedPath.node)) {
      return resolvedPath
    }
  } else if (utils.isReactComponentClass(definition)) {
    utils.normalizeClassDefinition(definition)
    return definition
  } else if (utils.isStatelessComponent(definition)) {
    return definition
  }
  return null
}

const componentResolver = (ast, recast) => {
  const types = recast.types.namedTypes
  const components = []

  const exportDeclaration = (path) => {
    const definitions = utils.resolveExportDeclaration(path, types)
      .reduce((acc, definition) => {
        if (isComponentDefinition(definition)) {
          acc.push(definition)
        } else {
          const resolved = utils.resolveToValue(resolveHOC(definition))
          if (resolved.node.type === 'ImportDeclaration') {
            // Manage imported components in HOC from different file
            const importType = { path: resolved.node.source.value }
            throw importType
          }

          if (isComponentDefinition(resolved)) {
            acc.push(resolved)
          }
        }
        return acc
      }, [])
      .map(definition => resolveDefinition(definition, types))

    if (definitions.length === 0) {
      return false
    }
    definitions.forEach((definition) => {
      if (definition && components.indexOf(definition) === -1) {
        components.push(definition)
      }
    })
    return false
  }

  const assignmentExpression = (path) => {
    let resolvedPath = path
    // Ignore anything that is not `exports.X = ...;` or
    // `module.exports = ...;`
    if (!utils.isExportsOrModuleAssignment(resolvedPath)) {
      return false
    }
    // Resolve the value of the right hand side. It should resolve to a call
    // expression, something like React.createClass
    resolvedPath = utils.resolveToValue(resolvedPath.get('right'))
    if (!isComponentDefinition(resolvedPath)) {
      resolvedPath = utils.resolveToValue(resolveHOC(resolvedPath))
      if (!isComponentDefinition(resolvedPath)) {
        return false
      }
    }
    const definition = resolveDefinition(resolvedPath, types)
    if (definition && components.indexOf(definition) === -1) {
      components.push(definition)
    }
    return false
  }

  recast.visit(ast, {
    visitExportDeclaration: exportDeclaration,
    visitExportNamedDeclaration: exportDeclaration,
    visitExportDefaultDeclaration: exportDeclaration,
    visitAssignmentExpression: assignmentExpression,
  })

  return components
}

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
  })
}

const resolvePath = async (path) => {
  const extensions = ['.js', '.jsx', '']
  for (let i = 0; i < extensions.length; i += 1) {
    const newpath = path + extensions[i]
    try {
      const stats = await fs.statAsync(newpath)
      if (stats.isDirectory()) {
        return resolvePath(p.resolve(path, 'index.js'))
      }
      return newpath
    } catch (e) {
      // file path not found
    }
  }
  return null
}

const resolve = async (componentPath) => {
  const resolvedPath = await resolvePath(componentPath)
  const isIndex = resolvedPath.endsWith('/index.js')
  const file = await fs.readFileAsync(resolvedPath, 'utf-8')

  try {
    return docgen.parse(file, isIndex ? indexResolver : componentResolver)
  } catch (e) {
    if (e.path) {
      const newPath = await resolvePath(p.resolve(componentPath, isIndex ? '.' : '..', e.path))
      if (newPath) {
        return resolve(newPath)
      }
    }
  }
  return null
}

module.exports = {
  resolve,
}
