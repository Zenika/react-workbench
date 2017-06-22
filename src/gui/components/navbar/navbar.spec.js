/* eslint-env jest */
import snap from 'misc/test/snap'
import Navbar from './navbar'

const snapshot = snap(Navbar)

describe('component/navbar', () => {
  it('should take custom className', snapshot({ className: 'custom' }))
  it('should take custom style', snapshot({ style: { backgroundColor: 'red' } }))
  it('should have a default behaviour', snapshot({ }))
})
