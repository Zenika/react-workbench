import documentation from './documentation'

export const fetchDocumentation = format => async (dispatch) => {
  dispatch(documentation.reset())
  try {
    const response = await fetch(`/api/doc?format=${format}`)
    const text = await response.text()
    dispatch(documentation.set(text))
  } catch (error) {
    dispatch(documentation.set(''))
  }
}
