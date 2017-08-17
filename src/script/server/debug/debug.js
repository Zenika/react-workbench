module.exports = {
  get: () => (dispatch, getState) => ({
    redux: getState(),
  }),
}
