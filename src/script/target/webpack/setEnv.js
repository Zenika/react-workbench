module.exports = (state) => {
  process.env.NODE_ENV = 'development'
  process.env.NODE_PATH = state.projectPath
}
