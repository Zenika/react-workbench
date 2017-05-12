/* eslint-env jest */
jest.mock('./constants', () => ({}))
jest.mock('fs', () => ({
  mkdirAsync: jest.fn(async () => undefined),
  writeFileAsync: jest.fn(async () => undefined),
  readFileAsync: jest.fn(async () => undefined),
}))

const fs = require('fs')
const ddb = require('./ddb')

describe('server/api/ddb', () => {
  describe('write', () => {
    it('should create the configuration directory', () => {
      // TODO
    })
    it('should pass when configuration directory exists', () => {
      // TODO
    })
    it('should write data into the directory', () => {
      // TODO
    })
    describe('errors', () => {
      it('should throw an error when unexpected fs error happens', () => {
        // TODO
      })
    })
  })

  describe('read', () => {
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

  describe('append', () => {
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
