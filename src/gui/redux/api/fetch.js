import { readme, html } from '../store'

const fetchDoc = reducer => url => async (dispatch) => {
  dispatch(reducer.reset())
  try {
    const response = await fetch(url)
    const text = await response.text()
    dispatch(reducer.set(text))
  } catch (error) {
    dispatch(reducer.set(''))
  }
}

export default {
  readme: () => fetchDoc(readme)('/api/readme'),
  html: () => fetchDoc(html)('/api/html'),
}
