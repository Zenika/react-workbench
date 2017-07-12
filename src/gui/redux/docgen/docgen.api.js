import docgen from './docgen'

export const fetchDocgen = () => async (dispatch) => {
  dispatch(docgen.reset())
  try {
    const response = await fetch('/api/doc')
    const json = await response.json()
    if (json && json.length > 0) {
      dispatch(docgen.set(json[0]))
    } else {
      dispatch(docgen.set({}))
    }
  } catch (error) {
    dispatch(docgen.set({}))
  }
}
