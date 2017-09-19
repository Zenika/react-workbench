/* eslint-env jest */
jest.mock('fs', () => ({ readFileAsync: jest.fn(), writeFileAsync: jest.fn() }))
jest.mock('./markdown', () => ({ generate: jest.fn() }))

const fs = require('fs')
const markdown = require('./markdown')
const readme = require('./readme')

const getState = () => ({
  component: {
    name: 'foo',
    path: { absolute: { dir: '/foo/bar/baz' } },
  },
})

describe('service/readme', () => {
  describe('get readme file', () => {
    it('should return README.md file content if exists', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => 'README CONTENT'))

      // calls
      const content = await readme.get()(undefined, getState)

      // asserts
      expect(content).toMatchSnapshot()
    })

    it('should generate component markdown if README.md file doesnt exist', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(
        jest.fn(async () => {
          const error = { errno: -2 }
          throw error
        })
      )
      markdown.generate.mockImplementation(jest.fn(async () => 'MARKDOWN CONTENT'))

      // calls
      const content = await readme.get()(undefined, getState)

      // asserts
      expect(markdown.generate.mock.calls).toMatchSnapshot()
      expect(content).toMatchSnapshot()
    })

    it('should throw an error when reading fs fails', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(
        jest.fn(async () => {
          throw new Error('fs fails to read file')
        })
      )

      // calls
      let error = false
      try {
        await readme.get()(undefined, getState)
      } catch (ex) {
        error = true
      }

      // asserts
      expect(error).toBe(true)
    })
  })

  describe('save readme file', () => {
    it('should save README.md file with given content', async () => {
      // mocks
      fs.writeFileAsync.mockImplementation(jest.fn(async () => {}))

      // calls
      await readme.save('content')(undefined, getState)

      // asserts
      expect(fs.writeFileAsync.mock.calls).toMatchSnapshot()
    })

    it('should throw the underlaying fs exception', async () => {
      // mocks
      fs.writeFileAsync.mockImplementation(jest.fn(() => {
        throw new Error('fs fails to write file')
      }))

      // calls
      let error = false
      try {
        await readme.save('content')(undefined, getState)
      } catch (ex) {
        error = ex
      }

      // assert
      expect(error).toMatchSnapshot()
    })
  })
})
