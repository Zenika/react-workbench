import { put, select } from 'redux-saga/effects'
import { state as uiStore } from '../../redux/ui'
import { state as store } from '../../redux/component'

export function* setUiState(state) {
  yield put(uiStore.set(JSON.stringify(state, null, 2)))
}

export function* setComponentState() {
  const state = yield select(uiStore.get())
  yield put(store.set(JSON.parse(state)))
}
