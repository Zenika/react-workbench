import { select, call } from 'redux-saga/effects'
import { readme } from '../../redux/documentation'

export function* saveReadme() {
  const state = yield select(readme.get())

  yield call(fetch, '/api/readme', { method: 'POST', body: state })
}
