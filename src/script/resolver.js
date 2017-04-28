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
            const importType = {
              path: resolved.node.source.value,
            }
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
    visitFunctionDeclaration: false,
    visitFunctionExpression: false,
    visitClassDeclaration: false,
    visitClassExpression: false,
    visitIfStatement: false,
    visitWithStatement: false,
    visitSwitchStatement: false,
    visitCatchCause: false,
    visitWhileStatement: false,
    visitDoWhileStatement: false,
    visitForStatement: false,
    visitForInStatement: false,
    visitExportDeclaration: exportDeclaration,
    visitExportNamedDeclaration: exportDeclaration,
    visitExportDefaultDeclaration: exportDeclaration,
    visitAssignmentExpression: assignmentExpression,
  })

  return components
}

const resolvePath = async (path) => {
  const extensions = ['.js', '.jsx', '']
  for (let i = 0; i < extensions.length; i += 1) {
    const newpath = path + extensions[i]
    try {
      await fs.accessAsync(newpath, fs.F_OK)
      return newpath
    } catch (e) {
      // file path not found
    }
  }
  return null
}

const resolve = async (componentPath) => {
  const resolvedPath = await resolvePath(componentPath)

  const file = await fs.readFileAsync(resolvedPath, 'utf-8')

  try {
    return docgen.parse(file, componentResolver)
  } catch (e) {
    if (e.path) {
      const newPath = await resolvePath(p.resolve(componentPath, '..', e.path))
      if (newPath) {
        return resolve(newPath)
      }
    }
  }
  return null
}

module.exports = resolve
