/* eslint-env jest */
jest.mock('fs', () => ({
  readFileAsync: jest.fn(async () => undefined),
  statAsync: jest.fn(async () => ({ isDirectory: () => false })),
}))

jest.mock('react-docgen', () => ({ parse: jest.fn() }))
jest.mock('./resolvers', () => ({ }))

const service = require('./service')

describe('server/api/models/docgen', () => {
  it('should test it', async () => {
    const result = await service.resolve('toto')
    expect(result).toBeUndefined()
  })
})
