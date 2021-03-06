// Revolver implementation based on :
// https://github.com/reactjs/react-docgen/blob/master/src/resolver/findAllExportedComponentDefinitions.js

const utils = require('react-docgen/dist/utils')
const resolveHOC = require('react-docgen/dist/utils/resolveHOC').default

const isComponentDefinition = (path) => {
  return utils.isReactCreateClassCall(path)
    || utils.isReactComponentClass(path)
    || utils.isStatelessComponent(path)
}

const resolveDefinition = (definition) => {
  if (utils.isReactCreateClassCall(definition)) {
    return utils.resolveToValue(definition.get('arguments', 0))
  } else if (utils.isReactComponentClass(definition)) {
    utils.normalizeClassDefinition(definition)
    return definition
  }
  return definition
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
      .map(definition => resolveDefinition(definition))

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
    // Resolve the value of the right hand side. It should resolve to a call
    // expression, something like React.createClass
    resolvedPath = utils.resolveToValue(resolvedPath.get('right'))
    if (!isComponentDefinition(resolvedPath)) {
      resolvedPath = utils.resolveToValue(resolveHOC(resolvedPath))
      if (!isComponentDefinition(resolvedPath)) {
        return false
      }
    }
    const definition = resolveDefinition(resolvedPath)
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

module.exports = componentResolver
