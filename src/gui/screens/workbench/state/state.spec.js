/* eslint-env jest */
import snap from 'misc/test/snap'
import state from './index' // eslint-disable-line
import Graphical from './state'
import { mapState, mapDispatch } from './state.container'

describe('workbench/state', () => {
  describe('graphical', () => {
    const snapshot = snap(Graphical)

    // FIXME : merge on className seems not to work
    it('should print props', snapshot({ style: { backgroundColor: 'red' }, className: 'custom', onChange: () => {}, setState: () => {} }))
    it('should have a default behaviour', snapshot({}))
  })

  describe('container', () => {
    it('should map state', () => {
      const props = mapState({
        ui: {
          state: 'some state',
        },
      })

      expect(props).toMatchSnapshot()
    })

    it('should map dispatch', () => {
      const dispatch = jest.fn()

      // object
      const props = mapDispatch(dispatch)
      expect(props).toMatchSnapshot()

      // events
      props.onChange({ target: { value: 'input value' } })
      props.setState()

      expect(dispatch.mock.calls).toMatchSnapshot()
    })
  })
})
