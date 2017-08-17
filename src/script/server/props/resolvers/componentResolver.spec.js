/* eslint-env jest */
// Revolver tests based on :
// https://github.com/reactjs/react-docgen/blob/master/src/resolver/__tests__/findAllExportedComponentDefinitions-test.js

const recast = require('recast')
const { parse } = require('misc/test/recast')

const componentResolver = require('./componentResolver')

describe('server/api/models/docgen/resolvers/componentResolver', () => {
  const findComponents = path => componentResolver(path, recast)

  describe('CommonJS module exports', () => {
    describe('React.createClass', () => {
      it('finds React.createClass', () => {
        const parsed = parse(`
          var React = require("React");
          var Component = React.createClass({});
          module.exports = Component;
        `)
        const actual = findComponents(parsed)
        const expected = parsed.get('body', 1, 'declarations', 0, 'init', 'arguments', 0)

        expect(actual.length).toBe(1)
        expect(actual[0].node).toBe(expected.node)
      })

      it('finds React.createClass, independent of the var name', () => {
        const parsed = parse(`
          var R = require("React");
          var Component = R.createClass({});
          module.exports = Component;
        `)
        const actual = findComponents(parsed)

        expect(actual.length).toBe(1)
      })

      it('does not process X.createClass of other modules', () => {
        const parsed = parse(`
          var R = require("NoReact");
          var Component = R.createClass({});
          module.exports = Component;
        `)
        const actual = findComponents(parsed)

        expect(actual.length).toBe(0)
      })
    })

    describe('class definitions', () => {
      it('finds class declarations', () => {
        const parsed = parse(`
          var React = require("React");
          class Component extends React.Component {}
          module.exports = Component;
        `)
        const actual = findComponents(parsed)
        const expected = parsed.get('body', 1)

        expect(actual.length).toBe(1)
        expect(actual[0].node).toBe(expected.node)
      })

      it('finds class expression', () => {
        const parsed = parse(`
          var React = require("React");
          var Component = class extends React.Component {}
          module.exports = Component;
        `)
        const actual = findComponents(parsed)

        expect(actual.length).toBe(1)
      })

      it('finds class definition, independent of the var name', () => {
        const parsed = parse(`
          var R = require("React");
          class Component extends R.Component {}
          module.exports = Component;
        `)
        const actual = findComponents(parsed)

        expect(actual.length).toBe(1)
      })
    })

    describe('stateless components', () => {
      it('finds stateless component with JSX', () => {
        const parsed = parse(`
          var React = require("React");
          var Component = () => <div />;
          module.exports = Component;
        `)
        const actual = findComponents(parsed)
        const expected = parsed.get('body', 1, 'declarations', 0, 'init')

        expect(actual.length).toBe(1)
        expect(actual[0].node).toBe(expected.node)
      })

      it('finds stateless components with React.createElement, independent of the var name', () => {
        const parsed = parse(`
          var R = require("React");
          var Component = () => R.createElement('div', {});
          module.exports = Component;
        `)
        const actual = findComponents(parsed)

        expect(actual.length).toBe(1)
      })

      it('does not process X.createElement of other modules', () => {
        const parsed = parse(`
          var R = require("NoReact");
          var Component = () => R.createElement({});
          module.exports = Component;
        `)
        const actual = findComponents(parsed)

        expect(actual.length).toBe(0)
      })
    })

    describe('module.exports = <C>; / exports.foo = <C>;', () => {
      describe('React.createClass', () => {
        it('finds assignments to exports', () => {
          const parsed = parse(`
            var R = require("React");
            var Component = R.createClass({});
            exports.foo = 42;
            exports.Component = Component;
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
        })

        it('finds multiple exported components', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            var ComponentB = R.createClass({});
            exports.ComponentA = ComponentA;
            exports.ComponentB = ComponentB;
          `)
          const actual = findComponents(parsed)
          const expectedA = parsed.get('body', 1, 'declarations', 0, 'init', 'arguments', 0)
          const expectedB = parsed.get('body', 2, 'declarations', 0, 'init', 'arguments', 0)

          expect(actual.length).toBe(2)
          expect(actual[0].node).toBe(expectedA.node)
          expect(actual[1].node).toBe(expectedB.node)
        })

        it('finds multiple exported components with hocs', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            var ComponentB = R.createClass({});
            exports.ComponentA = hoc(ComponentA);
            exports.ComponentB = hoc(ComponentB);
          `)
          const actual = findComponents(parsed)
          const expectedA = parsed.get('body', 1, 'declarations', 0, 'init', 'arguments', 0)
          const expectedB = parsed.get('body', 2, 'declarations', 0, 'init', 'arguments', 0)

          expect(actual.length).toBe(2)
          expect(actual[0].node).toBe(expectedA.node)
          expect(actual[1].node).toBe(expectedB.node)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            var ComponentB = R.createClass({});
            exports.ComponentB = ComponentB;
          `)
          const actual = findComponents(parsed)
          const expected = parsed.get('body', 2, 'declarations', 0, 'init', 'arguments', 0)

          expect(actual.length).toBe(1)
          expect(actual[0].node).toBe(expected.node)

          const parsed2 = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            var ComponentB = R.createClass({});
            module.exports = ComponentB;
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)
        })

        it('finds exported components only once', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            exports.ComponentA = ComponentA;
            exports.ComponentB = ComponentA;
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
        })
      })

      describe('class definition', () => {
        it('finds assignments to exports', () => {
          const parsed = parse(`
            var R = require("React");
            class Component extends R.Component {}
            exports.foo = 42;
            exports.Component = Component;
          `)
          const actual = findComponents(parsed)
          const expected = parsed.get('body', 1)

          expect(actual.length).toBe(1)
          expect(actual[0].node).toBe(expected.node)
        })

        it('finds multiple exported components', () => {
          const parsed = parse(`
            var R = require("React");
            class ComponentA extends R.Component {}
            class ComponentB extends R.Component {}
            exports.ComponentA = ComponentA;
            exports.ComponentB = ComponentB;
          `)
          const actual = findComponents(parsed)
          const expectedA = parsed.get('body', 1)
          const expectedB = parsed.get('body', 2)

          expect(actual.length).toBe(2)
          expect(actual[0].node).toBe(expectedA.node)
          expect(actual[1].node).toBe(expectedB.node)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            var R = require("React");
            class ComponentA extends R.Component {}
            class ComponentB extends R.Component {}
            exports.ComponentB = ComponentB;
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)

          const parsed2 = parse(`
            var R = require("React");
            class ComponentA extends R.Component {}
            class ComponentB extends R.Component {}
            module.exports = ComponentB;
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)
        })

        it('finds exported components only once', () => {
          const parsed = parse(`
            var R = require("React");
            class ComponentA extends R.Component {}
            exports.ComponentA = ComponentA;
            exports.ComponentB = ComponentA;
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
        })
      })
    })
  })

  describe('ES6 export declarations', () => {
    describe('export default <component>;', () => {
      describe('React.createClass', () => {
        it('finds default export', () => {
          const parsed = parse(`
            var React = require("React");
            var Component = React.createClass({});
            export default Component
          `)
          const actual = findComponents(parsed)
          const expected = parsed.get('body', 1, 'declarations', 0, 'init', 'arguments', 0)

          expect(actual.length).toBe(1)
          expect(actual[0].node).toBe(expected.node)

          const parsed2 = parse(`
            var React = require("React");
            export default React.createClass({});
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)
        })

        it('finds multiple exported components', () => {
          const parsed = parse(`
            import React, { createElement } from "React"
            export var Component = React.createClass({});
            export default React.createClass({});
          `)
          const actual = findComponents(parsed)
          const expectedA = parsed.get(
            'body',
            1,
            'declaration',
            'declarations',
            0,
            'init',
            'arguments',
            0
          )
          const expectedB = parsed.get('body', 2, 'declaration', 'arguments', 0)

          expect(actual.length).toBe(2)
          expect(actual[0].node).toBe(expectedA.node)
          expect(actual[1].node).toBe(expectedB.node)

          const parsed2 = parse(`
            import React, { createElement } from "React"
            var Component = React.createClass({})
            export {Component};
            export default React.createClass({});
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            import React, { createElement } from "React"
            var Component = React.createClass({})
            export default React.createClass({});
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
        })
      })

      describe('class definition', () => {
        it('finds default export', () => {
          const parsed = parse(`
            import React from 'React';
            class Component extends React.Component {}
            export default Component;
          `)
          const actual = findComponents(parsed)
          const expected = parsed.get('body', 1)

          expect(actual.length).toBe(1)
          expect(actual[0].node).toBe(expected.node)

          const parsed2 = parse(`
            import React from 'React';
            export default class Component extends React.Component {};
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)
        })

        it('finds multiple exported components', () => {
          const parsed = parse(`
            import React from 'React';
            export var Component = class extends React.Component {};
            export default class ComponentB extends React.Component{};
          `)
          const actual = findComponents(parsed)
          const expectedA = parsed.get('body', 1, 'declaration', 'declarations', 0, 'init')
          const expectedB = parsed.get('body', 2, 'declaration')

          expect(actual.length).toBe(2)
          expect(actual[0].node).toBe(expectedA.node)
          expect(actual[1].node).toBe(expectedB.node)

          const parsed2 = parse(`
            import React from 'React';
            var Component = class extends React.Component {};
            export {Component};
            export default class ComponentB extends React.Component{};
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            import React from 'React';
            var Component = class extends React.Component {};
            export default class ComponentB extends React.Component{};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
        })
      })
    })

    describe('export var foo = <C>, ...;', () => {
      describe('React.createClass', () => {
        it('finds named exports', () => {
          const parsed = parse(`
            var React = require("React");
            export var somethingElse = 42, Component = React.createClass({});
          `)
          const actual = findComponents(parsed)
          const expected = parsed.get(
            'body',
            1,
            'declaration',
            'declarations',
            1,
            'init',
            'arguments',
            0
          )

          expect(actual.length).toBe(1)
          expect(actual[0].node).toBe(expected.node)

          const parsed2 = parse(`
            var React = require("React");
            export const Component = React.createClass({}), somethingElse = 42;
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)

          const parsed3 = parse(`
            var React = require("React");
            export const something = 21,
             Component = React.createClass({}),
             somethingElse = 42;
          `)
          const actual3 = findComponents(parsed3)

          expect(actual3.length).toBe(1)

          const parsed4 = parse(`
            var React = require("React");
            export var somethingElse = function() {};
            export let Component = React.createClass({});
          `)
          const actual4 = findComponents(parsed4)

          expect(actual4.length).toBe(1)
        })

        it('finds multiple components', () => {
          const parsed = parse(`
            var R = require("React");
            export var ComponentA = R.createClass({}),
              ComponentB = R.createClass({});
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)

          const parsed2 = parse(`
            var R = require("React");
            export var ComponentA = R.createClass({});
            var ComponentB = R.createClass({});
            export {ComponentB};
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            export let ComponentB = R.createClass({});
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
        })
      })

      describe('class definition', () => {
        it('finds named exports', () => {
          const parsed = parse(`
            import React from 'React';
            export var somethingElse = 42,
              Component = class extends React.Component {};
          `)
          const actual = findComponents(parsed)
          const expected = parsed.get('body', 1, 'declaration', 'declarations', 1, 'init')

          expect(actual.length).toBe(1)
          expect(actual[0].node).toBe(expected.node)

          const parsed2 = parse(`
            import React from 'React';
            export let Component = class extends React.Component {},
              somethingElse = 42;
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)
          expect(actual2[0].node.type).toBe('ClassExpression')

          const parsed3 = parse(`
            import React from 'React';
            export const something = 21,
              Component = class extends React.Component {},
              somethingElse = 42;
          `)
          const actual3 = findComponents(parsed3)

          expect(actual3.length).toBe(1)
          expect(actual3[0].node.type).toBe('ClassExpression')

          const parsed4 = parse(`
            import React from 'React';
            export var somethingElse = function() {};
            export let Component  = class extends React.Component {};
          `)
          const actual4 = findComponents(parsed4)

          expect(actual4.length).toBe(1)
          expect(actual4[0].node.type).toBe('ClassExpression')
        })

        it('finds multiple components', () => {
          const parsed = parse(`
            import React from 'React';
            export var ComponentA  = class extends React.Component {};
            export var ComponentB  = class extends React.Component {};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)

          const parsed2 = parse(`
            import React from 'React';
            export var ComponentA = class extends React.Component {};
            var ComponentB  = class extends React.Component {};
            export {ComponentB};
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            import React from 'React';
            var ComponentA  = class extends React.Component {}
            export var ComponentB = class extends React.Component {};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ClassExpression')
        })
      })

      describe('stateless components', () => {
        it('finds named exports', () => {
          const parsed = parse(`
            import React from 'React';
            export var somethingElse = 42,
              Component = () => <div />;
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ArrowFunctionExpression')

          const parsed2 = parse(`
            import React from 'React';
            export let Component = () => <div />,
              somethingElse = 42;
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)
          expect(actual2[0].node.type).toBe('ArrowFunctionExpression')

          const parsed3 = parse(`
            import React from 'React';
            export const something = 21,
              Component = () => <div />,
              somethingElse = 42;
          `)
          const actual3 = findComponents(parsed3)

          expect(actual3.length).toBe(1)
          expect(actual3[0].node.type).toBe('ArrowFunctionExpression')

          const parsed4 = parse(`
            import React from 'React';
            export var somethingElse = function() {};
            export let Component = () => <div />
          `)
          const actual4 = findComponents(parsed4)

          expect(actual4.length).toBe(1)
          expect(actual4[0].node.type).toBe('ArrowFunctionExpression')
        })

        it('finds multiple components', () => {
          const parsed = parse(`
            import React from 'React';
            export var ComponentA = () => <div />
            export var ComponentB = () => <div />
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)

          const parsed2 = parse(`
            import React from 'React';
            export var ComponentA = () => <div />
            var ComponentB  = () => <div />
            export {ComponentB};
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            import React from 'React';
            var ComponentA  = class extends React.Component {}
            export var ComponentB = function() { return <div />; };
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('FunctionExpression')
        })
      })
    })

    describe('export {<C>};', () => {
      describe('React.createClass', () => {
        it('finds exported specifiers', () => {
          const parsed = parse(`
            var React = require("React");
            var foo = 42;
            var Component = React.createClass({});
            export {foo, Component}
          `)
          const actual = findComponents(parsed)
          const expected = parsed.get('body', 2, 'declarations', 0, 'init', 'arguments', 0)

          expect(actual.length).toBe(1)
          expect(actual[0].node).toBe(expected.node)

          const parsed2 = parse(`
            import React from "React"
            var React = require("React");
            var Component = React.createClass({});
            export {Component, foo}
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)

          const parsed3 = parse(`
            import React, { createElement } from "React"
            var foo = 42;
            var baz = 21;
            var Component = React.createClass({});
            export {foo, Component as bar, baz}
          `)
          const actual3 = findComponents(parsed3)

          expect(actual3.length).toBe(1)
        })

        it('finds multiple components', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            var ComponentB = R.createClass({});
            export {ComponentA as foo, ComponentB};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)
        })

        it('finds multiple components with hocs', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = hoc(R.createClass({}));
            var ComponentB = hoc(R.createClass({}));
            export {ComponentA as foo, ComponentB};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            var ComponentB = R.createClass({});
            export {ComponentA}
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
        })

        it('finds exported components only once', () => {
          const parsed = parse(`
            var R = require("React");
            var ComponentA = R.createClass({});
            export {ComponentA as foo, ComponentA as bar};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
        })
      })

      describe('class definition', () => {
        it('finds exported specifiers', () => {
          const parsed = parse(`
            import React from 'React';
            var foo = 42;
            var Component = class extends React.Component {};
            export {foo, Component};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ClassExpression')

          const parsed2 = parse(`
            import React from 'React';
            var foo = 42;
            var Component = class extends React.Component {};
            export {Component, foo};
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)
          expect(actual2[0].node.type).toBe('ClassExpression')

          const parsed3 = parse(`
            import React from 'React';
            var foo = 42;
            var baz = 21;
            var Component = class extends React.Component {};
            export {foo, Component as bar, baz};
          `)
          const actual3 = findComponents(parsed3)

          expect(actual3.length).toBe(1)
          expect(actual3[0].node.type).toBe('ClassExpression')
        })

        it('finds multiple components', () => {
          const parsed = parse(`
            import React from 'React';
            var ComponentA = class extends React.Component {};
            var ComponentB = class extends React.Component {};
            export {ComponentA as foo, ComponentB};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)
        })

        it('finds multiple components with hocs', () => {
          const parsed = parse(`
            import React from 'React';
            class ComponentA extends React.Component {};
            class ComponentB extends React.Component {};
            var WrappedA = hoc(ComponentA);
            var WrappedB = hoc(ComponentB);
            export {WrappedA, WrappedB};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            import React from 'React';
            var ComponentA = class extends React.Component {};
            var ComponentB = class extends React.Component {};
            export {ComponentA};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ClassExpression')
        })

        it('finds exported components only once', () => {
          const parsed = parse(`
            import React from 'React';
            var ComponentA = class extends React.Component {};
            var ComponentB = class extends React.Component {};
            export {ComponentA as foo, ComponentA as bar};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ClassExpression')
        })
      })

      describe('stateless components', () => {
        it('finds exported specifiers', () => {
          const parsed = parse(`
            import React from 'React';
            var foo = 42;
            function Component() { return <div />; }
            export {foo, Component};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('FunctionDeclaration')

          const parsed2 = parse(`
            import React from 'React';
            var foo = 42;
            var Component = () => <div />;
            export {Component, foo};
          `)
          const actual2 = findComponents(parsed2)

          expect(actual2.length).toBe(1)
          expect(actual2[0].node.type).toBe('ArrowFunctionExpression')

          const parsed3 = parse(`
            import React from 'React';
            var foo = 42;
            var baz = 21;
            var Component = function () { return <div />; }
            export {foo, Component as bar, baz};
          `)
          const actual3 = findComponents(parsed3)

          expect(actual3.length).toBe(1)
          expect(actual3[0].node.type).toBe('FunctionExpression')
        })

        it('finds multiple components', () => {
          const parsed = parse(`
            import React from 'React';
            var ComponentA = () => <div />;
            function ComponentB() { return <div />; }
            export {ComponentA as foo, ComponentB};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            import React from 'React';
            var ComponentA = () => <div />;
            var ComponentB = () => <div />;
            export {ComponentA};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ArrowFunctionExpression')
        })

        it('finds exported components only once', () => {
          const parsed = parse(`
            import React from 'React';
            var ComponentA = () => <div />;
            var ComponentB = () => <div />;
            export {ComponentA as foo, ComponentA as bar};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ArrowFunctionExpression')
        })
      })
    })

    describe('export <C>;', () => {
      describe('class definition', () => {
        it('finds named exports', () => {
          const parsed = parse(`
            import React from 'React';
            export var foo = 42;
            export class Component extends React.Component {};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ClassDeclaration')
        })

        it('finds multiple components', () => {
          const parsed = parse(`
            import React from 'React';
            export class ComponentA extends React.Component {};
            export class ComponentB extends React.Component {};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            import React from 'React';
            class ComponentA extends React.Component {};
            export class ComponentB extends React.Component {};
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('ClassDeclaration')
        })
      })

      describe('function declaration', () => {
        it('finds named exports', () => {
          const parsed = parse(`
            import React from 'React';
            export var foo = 42;
            export function Component() { return <div />; };
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('FunctionDeclaration')
        })

        it('finds multiple components', () => {
          const parsed = parse(`
            import React from 'React';
            export function ComponentA() { return <div />; };
            export function ComponentB() { return <div />; };
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(2)
        })

        it('finds only exported components', () => {
          const parsed = parse(`
            import React from 'React';
            function ComponentA() { return <div />; }
            export function ComponentB() { return <div />; };
          `)
          const actual = findComponents(parsed)

          expect(actual.length).toBe(1)
          expect(actual[0].node.type).toBe('FunctionDeclaration')
        })
      })
    })
  })

  describe('Custom tests of resolver', () => {
    it('should throw an exception if no component definition found and return the default exported element', () => {
      const parsed = parse(`
        import React from 'React';
        import Dumb from 'dumb-comp';
        import hoc from 'hoc-lib';
        export default hoc(Dumb)
      `)

      // calls
      let error = false
      let exception
      try {
        findComponents(parsed)
      } catch (ex) {
        error = true
        exception = ex
      }
      // asserts
      expect(error).toBe(true)
      expect(exception).toBeDefined()
      expect(exception.path).toBeDefined()
      expect(exception.path).toBe('dumb-comp')
    })
  })
})
