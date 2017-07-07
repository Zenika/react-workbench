/* eslint-disable global-require, import/no-dynamic-require */

module.exports = (config) => {
  const { projectPath } = config

  // try create-react-app configuration
  try {
    return {
      ...require(`${projectPath}/node_modules/react-scripts/config/webpack.config.dev.js`),
    }
  } catch (ex) {
    if (ex.code !== 'MODULE_NOT_FOUND') throw ex

    // try webpack.config.js
    return {
      ...require(`${projectPath}/webpack.config.js`),
    }

    // TODO: Ask user where is his webpack config
  }
}

/* eslint-enable global-require, import/no-dynamic-require */
