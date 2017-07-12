export const REQUEST_DOCUMENTATION = 'REQUEST_DOCUMENTATION'
export const RECEIVED_DOCUMENTATION = 'RECEIVED_DOCUMENTATION'
export const RECEIVED_EMPTY_DOCUMENTATION = 'RECEIVED_EMPTY_DOCUMENTATION'
export const FAILED_DOCUMENTATION = 'FAILED_DOCUMENTATION'

export const fetchDocumentation = () => async (dispatch) => {
  dispatch({ type: REQUEST_DOCUMENTATION })
  try {
    const response = await fetch('/api/doc?format=markdown')
    const text = await response.text()
    dispatch({ type: RECEIVED_DOCUMENTATION, payload: text })
  } catch (error) {
    dispatch({ type: FAILED_DOCUMENTATION, error })
  }
}
