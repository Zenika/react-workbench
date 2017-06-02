/* eslint-env jest */
jest.mock('fs', () => ({
  mkdirAsync: jest.fn(async () => undefined),
  writeFileAsync: jest.fn(async () => undefined),
  readFileAsync: jest.fn(async () => '[]'),
}))

const fs = require('fs')
const constants = require('./constants')
const ddb = require('./ddb')

describe('server/api/ddb', () => {
  beforeEach(() => {
    fs.mkdirAsync.mockClear()
    fs.writeFileAsync.mockClear()
    fs.readFileAsync.mockClear()

    fs.mkdirAsync.mockImplementation(jest.fn(async () => undefined))
    fs.writeFileAsync.mockImplementation(jest.fn(async () => undefined))
    fs.readFileAsync.mockImplementation(jest.fn(async () => undefined))
  })

  describe('init', () => {
    it('should provide ddb service', () => {
      // calls
      const service = ddb('foo')

      // asserts
      expect(service).toBeDefined()
      expect(typeof service.write).toBe('function')
      expect(typeof service.read).toBe('function')
      expect(typeof service.append).toBe('function')
    })
  })

  describe('write', () => {
    // data
    const name = 'testedComponent.jsx'
    const content = ['foo', 'bar']

    it('should create the configuration directory', async () => {
      // calls
      const data = await ddb(name).write(content)

      // asserts
      expect(data).toBeDefined()
      expect(fs.mkdirAsync.mock.calls.length).toBe(1)
      expect(fs.mkdirAsync.mock.calls[0][0]).toBe(constants.COMPONENT_CONFIG_DIR)
    })

    it('should pass when configuration directory exists', async () => {
      // mocks
      fs.mkdirAsync.mockImplementation(jest.fn(async () => {
        const error = { errno: -17 }
        throw error
      }))

      // calls
      const data = await ddb(name).write(content)

      // asserts
      expect(data).toBeDefined()
      expect(fs.writeFileAsync.mock.calls.length).toBe(1)
    })

    it('should write data into the directory', async () => {
      // calls
      const data = await ddb(name).write(content)

      // asserts
      expect(data).toBeDefined()
      expect(data).toEqual(content)
      expect(fs.writeFileAsync.mock.calls.length).toBe(1)
      expect(fs.writeFileAsync.mock.calls[0][0]).toBe(`${constants.COMPONENT_CONFIG_DIR}/${name}.json`)
      expect(fs.writeFileAsync.mock.calls[0][1]).toBe(JSON.stringify(data))
    })

    it('should init an empty configuration when given data are undefined', async () => {
      // calls
      const data = await ddb(name).write(undefined)

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
          await ddb(name).write(content)
        } catch (ex) {
          error = true
        }

        // asserts
        expect(error).toBe(true)
      })
    })
  })

  describe('read', () => {
    // data
    const name = 'testedComponent.jsx'

    it('should read the configuration if exists', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => '[ "foo" ]'))

      // calls
      const data = await ddb(name).read()

      // asserts
      expect(data).toBeDefined()
      expect(data).toEqual(['foo'])
      expect(fs.readFileAsync.mock.calls.length).toBe(1)
      expect(fs.readFileAsync.mock.calls[0][0]).toBe(`${constants.COMPONENT_CONFIG_DIR}/${name}.json`)
    })

    it('should return "undefined" if configuration file doesn\'t exists', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => {
        const error = { errno: -2 }
        throw error
      }))

      // calls
      const data = await ddb(name).read()

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
          await ddb(name).read()
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
      const result = await ddb('testedComponent.jsx').append(undefined)

      // asserts
      expect(result).toBeDefined()
      expect(result).toEqual([])
    })

    it('should return the current configuration if exists and nothing to append', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => '[ "foo" ]'))

      // calls
      const result = await ddb('testedComponent.jsx').append(undefined)

      // asserts
      expect(result).toBeDefined()
      expect(result).toEqual(['foo'])
    })

    it('should append & write content to an empty configuration', async () => {
      // calls
      const result = await ddb('testedComponent.jsx').append(content)

      // asserts
      expect(result).toBeDefined()
      expect(result).toEqual(['foo', 'bar'])
    })

    it('should append & write content to the existing configuration', async () => {
      // mocks
      fs.readFileAsync.mockImplementation(jest.fn(async () => '[ "baz" ]'))

      // calls
      const result = await ddb('testedComponent.jsx').append(content)

      // asserts
      expect(result).toBeDefined()
      expect(result).toEqual(['baz', 'foo', 'bar'])
    })
  })
})
