/* eslint-disable react/jsx-filename-extension */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import snap from 'misc/snap'
import Props from './props'
import PropsContainer from './props.container'

// mock input component into props
jest.mock('./input', () => 'input')

describe('component/props', () => {
  describe('props.jsx', () => {
    const snapshot = snap(Props)
    it('should take custom className', snapshot({ className: 'custom' }))
    it('should take custom style', snapshot({ style: { backgroundColor: 'red' } }))
    it('should render by default', snapshot({ }))
    it('should render inputs following given properties', snapshot({ properties: ['prop1', 'prop2'] }))
  })

  describe('props.container.js', () => {
    it('should map redux model into properties array', () => {
      const store = createStore(() => ({ model: { foo: { type: 'string' }, bar: { type: 'string' } } }))
      const container = renderer.create(
        <Provider store={store}>
          <PropsContainer />
        </Provider>
      )
      const tree = container.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
