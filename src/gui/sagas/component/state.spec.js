/* eslint-env jest */
import tester from 'trampss-redux-saga-tester'
import { setUiState, setComponentState } from './state'

describe('saga/component/state', () => {
  describe('setUiState', () => {
    const test = tester(setUiState)

    it('should set UI state', () => {
      expect(test({ some: 'state', with: { nested: 'infos' } })(/* no mocks */)).toMatchSnapshot()
    })
  })

  describe('setComponentState', () => {
    const test = tester(setComponentState)(/* no param */)

    it('should set component state', () => {
      const mocks = {
        select: [
          // get ui state
          () => '{ "some": "state", "with": { "nested": "infos" } }',
        ],
      }

      expect(test(mocks)).toMatchSnapshot()
    })
  })
})
