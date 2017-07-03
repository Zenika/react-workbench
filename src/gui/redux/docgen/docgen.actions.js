export const REQUEST_DOCGEN = 'REQUEST_DOCGEN'
export const RECEIVED_DOCGEN = 'RECEIVED_DOCGEN'
export const RECEIVED_EMPTY_DOCGEN = 'RECEIVED_EMPTY_DOCGEN'
export const FAILED_DOCGEN = 'FAILED_DOCGEN'

export const fetchDocgen = () => async (dispatch) => {
  dispatch({ type: REQUEST_DOCGEN })
  try {
    const response = await fetch('/api/docgen')
    const json = await response.json()
    if (json && json.length > 0) {
      dispatch({ type: RECEIVED_DOCGEN, payload: json[0] })
    } else {
      dispatch({ type: RECEIVED_EMPTY_DOCGEN })
    }
  } catch (error) {
    dispatch({ type: FAILED_DOCGEN, error })
  }
}
