/* eslint-env jest */
const recast = require('recast')
const { parse } = require('misc/test/recast')

const indexResolver = require('./indexResolver')

describe('server/api/models/docgen/resolvers/indexResolver', () => {
  const findComponents = path => indexResolver(path, recast)

  it('should throw the exported default component path', () => {
    const parsed = parse(`
      import Component from './my-component'
      export default Component
    `)

    let error
    try {
      findComponents(parsed)
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
    expect(error.path).toBeDefined()
    expect(error.path).toBe('./my-component')
  })

  it('should throw the exported default component path (alternative)', () => {
    const parsed = parse(`
      export { default } from './my-component'
    `)

    let error
    try {
      findComponents(parsed)
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
    expect(error.path).toBeDefined()
    expect(error.path).toBe('./my-component')
  })

  it('should throw the exported default enhanced component path', () => {
    const parsed = parse(`
      import Component from './my-component'
      import hoc from 'hoc-lib'
      export default hoc(Component)
    `)

    let error
    try {
      findComponents(parsed)
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
    expect(error.path).toBeDefined()
    expect(error.path).toBe('./my-component')
  })
})
