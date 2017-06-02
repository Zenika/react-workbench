/* eslint-env jest */
const recast = require('recast')
const { parse } = require('../../../../../../misc/recast')

const componentResolver = require('./componentResolver')

describe('server/api/models/docgen/resolvers/componentResolver', () => {
  it('should resolve a simple functional component', () => {
    const parsed = parse(`
      import React from 'React'
      const Component = () => {
        return <div />
      }
      export default Component
    `)
    const actual = componentResolver(parsed, recast)
    const expected = parsed.get('body', 1, 'declarations', 0, 'init', 'arguments', 0)
    expect(actual.length).toBe(1)
    expect(actual[0].node).toBe(expected.node)
  })

  it('should resolve a simple component class', () => {
    const parsed = parse(`
      import React from 'React'
      class Component extends React.Component {
        render() {
          return <div />
        }
      }
      export default Component
    `)
    const actual = componentResolver(parsed, recast)
    const expected = parsed.get('body', 1, 'declarations', 0, 'init', 'arguments', 0)
    expect(actual.length).toBe(1)
    expect(actual[0].node).toBe(expected.node)
  })

  it.skip('should resolve a simple functional component with HOC', () => {
    const parsed = parse(`
      import React from 'React'
      import { connect } from 'react-redux'
      const Component = () => {
        return <div />
      }
      export default connect(Component)
    `)
    const actual = componentResolver(parsed, recast)
    const expected = parsed.get('body', 1, 'declarations', 0, 'init', 'arguments', 0)
    expect(actual.length).toBe(1)
    expect(actual[0].node).toBe(expected.node)
  })
})
