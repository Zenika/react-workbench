/* eslint-env jest */
describe('tests/setup', () => {
  describe('console.error', () => {
    it('should throw error', () => {
      let error = false
      try {
        console.error('an error') // eslint-disable-line no-console
      } catch (ex) {
        error = true
        expect(ex.message).toEqual('an error')
      }
      expect(error).toBe(true)
    })
  })
})
