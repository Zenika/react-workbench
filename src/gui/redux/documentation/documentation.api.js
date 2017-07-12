import documentation from './documentation'

export const fetchDocumentation = () => async (dispatch) => {
  dispatch(documentation.reset())
  try {
    const response = await fetch('/api/doc?format=markdown')
    const text = await response.text()
    dispatch(documentation.set(text))
  } catch (error) {
    dispatch(documentation.set(''))
  }
}
