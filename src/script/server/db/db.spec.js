/* eslint-env jest */
jest.mock('fs', () => ({
  mkdirAsync: jest.fn(),
  writeFileAsync: jest.fn(),
  readFileAsync: jest.fn(),
  readdirAsync: jest.fn(),
}))

const fs = require('fs')
const db = require('./db')

const getState = () => ({
  component: {
    path: {
      absolute: {
        workbench: '/a/path/.workbench',
      },
    },
  },
})

describe('server/api/db', () => {
  beforeEach(() => {
    fs.mkdirAsync.mockClear()
    fs.writeFileAsync.mockClear()
    fs.readFileAsync.mockClear()
    fs.readdirAsync.mockClear()

    fs.mkdirAsync.mockImplementation(jest.fn())
    fs.writeFileAsync.mockImplementation(jest.fn())
    fs.readFileAsync.mockImplementation(jest.fn())
    fs.readdirAsync.mockImplementation(jest.fn())
  })

  describe('init', () => {
    it('should provide db service', () => {
      // calls
      const service = db('foo')(undefined, getState)

      // asserts
      expect(service).toBeDefined()
      expect(typeof service.write).toBe('function')
      expect(typeof service.read).toBe('function')
      expect(typeof service.append).toBe('function')
    })
  })

  describe('write', () => {
    const content = ['foo', 'bar']

    it('should create the configuration directory', async () => {
      // calls
      const data = await db()(undefined, getState).write('fileName.jsx', content)

      // asserts
      expect(data).toBeDefined()
      expect(fs.mkdirAsync.mock.calls.length).toBe(1)
      expect(fs.mkdirAsync.mock.calls[0][0]).toBe('/a/path/.workbench')
    })

    it('should pass when configuration directory exists', async () => {
      // mocks
      fs.mkdirAsync.mockImplementation(jest.fn(async () => {
        const error = { errno: -17 }
        throw error
      }))

      // calls
      const data = await db()(undefined, getState).write('fileName.jsx', content)

      // asserts
      expect(data).toBeDefined()
      expect(fs.writeFileAsync.mock.calls.length).toBe(1)
    })

    it('should write data into the directory', async () => {
      // calls
      const data = await db()(undefined, getState).write('aComponent.jsx.json', content)

      // asserts
      expect(data).toBeDefined()
      expect(data).toEqual(content)
      expect(fs.writeFileAsync.mock.calls.length).toBe(1)
      expect(fs.writeFileAsync.mock.calls[0][0]).toBe('/a/path/.workbench/aComponent.jsx.json')
      expect(fs.writeFileAsync.mock.calls[0][1]).toBe(JSON.stringify(data))
    })

    it('should init an empty configuration when given data are undefined', async () => {
      // calls
      const data = await db()(undefined, getState).write('fileName.jsx', undefined)

      // asserts
      expect(data).toBeDefined()
      expect(data).toEqual([])
    })

    describe('errors', () => {
      it('should throw an error when unexpected fs error happens', async () => {
        // mocks
        fs.mkdirAsync.mockImplementation(jest.fn(async () => {
          throw new Error()
        }))

        // calls
        let error = false
        try {
          await db()(undefined, getState).write(content)
        } catch (ex) {
          error = true
        }

        // asserts
        expect(error).toBe(true)
      })
    })
  })

  describe('read', () => {
    it('should read the configuration if exists', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => '[ "foo" ]'))

      // calls
      const data = await db()(undefined, getState).read('aComponent.jsx.json')

      // asserts
      expect(data).toBeDefined()
      expect(data).toEqual(['foo'])
      expect(fs.readFileAsync.mock.calls.length).toBe(1)
      expect(fs.readFileAsync.mock.calls[0][0]).toBe('/a/path/.workbench/aComponent.jsx.json')
    })

    it('should return "undefined" if configuration file doesn\'t exists', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))

      // calls
      const data = await db()(undefined, getState).read('fileName.json')

      // asserts
      expect(data).toBeUndefined()
    })

    describe('errors', () => {
      it('should throw an error when unexpected fs error happens', async () => {
        // mocks
        fs.readFileAsync.mockImplementation(jest.fn(async () => {
          throw new Error()
        }))

        // calls
        let error = false
        try {
          await db()(undefined, getState).read()
        } catch (ex) {
          error = true
        }

        // asserts
        expect(error).toBe(true)
      })
    })
  })

  describe('append', () => {
    // data
    const content = ['foo', 'bar']

    it('should return an empty configuration if doesn\'t exists and nothing to append', async () => {
      // calls
      const result = await db()(undefined, getState).append('fileName.jsx', undefined)

      // asserts
      expect(result).toBeDefined()
      expect(result).toEqual([])
    })

    it('should return the current configuration if exists and nothing to append', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => '[ "foo" ]'))

      // calls
      const result = await db()(undefined, getState).append('testedComponent.jsx', undefined)

      // asserts
      expect(result).toBeDefined()
      expect(result).toEqual(['foo'])
    })

    it('should append & write content to an empty configuration', async () => {
      // calls
      const result = await db()(undefined, getState).append('testedComponent.jsx', content)

      // asserts
      expect(result).toBeDefined()
      expect(result).toEqual(['foo', 'bar'])
    })

    it('should append & write content to the existing configuration', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => '[ "baz" ]'))

      // calls
      const result = await db()(undefined, getState).append('testedComponent.jsx', content)

      // asserts
      expect(result).toBeDefined()
      expect(result).toEqual(['baz', 'foo', 'bar'])
    })

    describe('list', () => {
      it('should list read all files in a directory', async () => {
        // mocks
        fs.readdirAsync.mockImplementation(jest.fn(() => ['file 1', 'file 2']))

        // calls
        const result = await db()(undefined, getState).list()

        // asserts
        expect(result).toMatchSnapshot()
        expect(fs.readdirAsync.mock.calls).toMatchSnapshot()
      })

      it('should handle an empty directory', async () => {
        // mocks
        fs.readdirAsync.mockImplementation(jest.fn(() => []))

        // calls
        const result = await db()(undefined, getState).list()

        // asserts
        expect(result).toMatchSnapshot()
        expect(fs.readdirAsync.mock.calls).toMatchSnapshot()
      })

      it('should throw the underlaying fs exception', async () => {
        // mocks
        fs.readdirAsync.mockImplementation(jest.fn(() => {
          throw new Error('fs readdir error')
        }))

        // calls
        let error = false
        try {
          await db()(undefined, getState).list()
        } catch (ex) {
          error = ex
        }

        // asserts
        expect(error).toMatchSnapshot()
        expect(fs.readdirAsync.mock.calls).toMatchSnapshot()
      })
    })
  })
})
