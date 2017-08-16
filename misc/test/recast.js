/*
 * test utils for recast
 * from react-docgen
 * https://github.com/reactjs/react-docgen/blob/master/tests/utils.js
 */
import _recast from 'recast'

import babylon from 'react-docgen/dist/babylon'

function stringify(value) {
  if (Array.isArray(value)) {
    return value.join('\n')
  }
  return value
}

/**
 * Returns a NodePath to the program node of the passed node
 */
export function parse(src, recast = _recast) {
  return new recast.types.NodePath(
    recast.parse(stringify(src), { esprima: babylon }).program
  )
}
