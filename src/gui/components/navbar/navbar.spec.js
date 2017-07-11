/* eslint-env jest */
import snap from 'misc/test/snap'
import Navbar from './navbar'

// mock input component into props
jest.mock('../navButton', () => 'navButton')

const snapshot = snap(Navbar)

describe('component/navbar', () => {
  it('should take custom className', snapshot({ className: 'custom' }))
  it('should take custom style', snapshot({ style: { backgroundColor: 'red' } }))
  it('should have a default behaviour', snapshot({ }))
})
