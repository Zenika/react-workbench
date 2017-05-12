/* eslint-env jest */
jest.mock('fs', () => ({
  mkdirAsync: jest.fn(async () => undefined),
  writeFileAsync: jest.fn(async () => undefined),
  readFileAsync: jest.fn(async () => undefined),
}))

const fs = require('fs')
const constants = require('./constants')
const ddb = require('./ddb')

describe('server/api/ddb', () => {
  beforeEach(() => {
    fs.mkdirAsync.mockClear()
    fs.writeFileAsync.mockClear()
    fs.readFileAsync.mockClear()
  })

  describe('write', () => {
    // data
    const name = 'testedComponent.jsx'
    const content = { foo: 'bar' }

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
      expect(fs.writeFileAsync.mock.calls[0][0]).toEqual(`${constants.COMPONENT_CONFIG_DIR}/${name}.json`)
      expect(fs.writeFileAsync.mock.calls[0][1]).toBe(JSON.stringify(data))
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

  describe.skip('read', () => {
    it('should read the configuration if exists', () => {
      // TODO
    })

    it('should return an empty configuration if doesn\'t exists', () => {
      // TODO
    })

    describe('errors', () => {
      it('should throw an error when unexpected fs error happens', () => {
        // TODO
      })
    })
  })

  describe.skip('append', () => {
    it('should retreive the configuration if exists', () => {
      // TODO
    })

    it('should retreive an empty configuration if doesn\'t exists', () => {
      // TODO
    })

    it('should append & write content to the existing configuration', () => {
      // TODO
    })
  })
})
