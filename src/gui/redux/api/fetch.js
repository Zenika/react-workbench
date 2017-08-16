import { readme, html, docgen } from '../store'

const ownFetch = (reducer, type) => (...fetchArgs) => async (dispatch) => {
  dispatch(reducer.reset())
  try {
    const response = await fetch(...fetchArgs)
    const text = await response[type]()
    dispatch(reducer.set(text))
  } catch (error) {
    dispatch(reducer.set(''))
  }
}

export default {
  readme: () => ownFetch(readme, 'text')('/api/readme'),
  html: () => (dispatch, getState) => {
    dispatch(ownFetch(html, 'text')(
      '/api/preview',
      {
        method: 'POST',
        body: readme.get()(getState()),
      },
    ))
  },
  docgen: () => ownFetch(docgen, 'json')('/api/props'),
}
