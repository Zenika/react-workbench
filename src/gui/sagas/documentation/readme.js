import { select } from 'redux-saga/effects'
import { readme } from '../../redux/documentation'

export function* saveReadme() {
  const state = yield select(readme.get())

  fetch('/api/readme', { method: 'POST', body: state })
    .then(() => console.log('saved'))
    .catch(ex => console.error(ex))
}
