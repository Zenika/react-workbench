/* eslint-disable react/jsx-filename-extension */
/* eslint-env jest */
import React from 'react'
import snap from 'misc/snap'
import { mount } from 'enzyme'
import Input from './input'

// eslint-disable-next-line
import InputContainer from './input.container'

describe('component/props/input', () => {
  describe('input.jsx', () => {
    const snapshot = snap(Input)
    const component = { name: 'foo', type: 'text', onChange: jest.fn() }

    describe('common props', () => {
      it('should take custom className', snapshot({ ...component, className: 'custom' }))
      it('should take custom style', snapshot({ ...component, style: { backgroundColor: 'red' } }))
    })

    describe('input type="text"', () => {
      it('should render a textfield', snapshot(component))
      it('should set a default value', snapshot({ ...component, value: 'bar' }))
      it('should trigger onChange events', () => {
        // data & mocks
        const props = { ...component, onChange: jest.fn() }
        const wrapper = mount(<Input {...props} />)

        // simulate
        wrapper.find('input').simulate('change', { target: { value: 'baz' } })

        // asserts
        expect(props.onChange.mock.calls.length).toBe(1)
        expect(props.onChange.mock.calls[0][0].target.value).toBe('baz')
      })
    })

    describe('input type="checkbox"', () => {
      it('should render a checkbox', snapshot({ ...component, type: 'checkbox' }))
      it('should set a default value', snapshot({ ...component, value: true }))
      it('should trigger onChange events', () => {
        // data & mocks
        const props = { ...component, type: 'checkbox', onChange: jest.fn() }
        const wrapper = mount(<Input {...props} />)

        // simulate
        wrapper.find('input').simulate('change', { target: { checked: true } })

        // asserts
        expect(props.onChange.mock.calls.length).toBe(1)
        expect(props.onChange.mock.calls[0][0].target.checked).toBe(true)
      })
    })
  })
})
