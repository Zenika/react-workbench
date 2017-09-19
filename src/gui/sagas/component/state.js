import { put, select, call } from 'redux-saga/effects'
import { state as uiStore, stateName as stateNameStore } from '../../redux/ui'
import { state as store, props as propsStore } from '../../redux/component'

export function* setUiState(state) {
  yield put(uiStore.set(JSON.stringify(state, null, 2)))
}

export function* setComponentState() {
  const state = yield select(uiStore.get())
  yield put(store.set(JSON.parse(state)))
}

export function* save() {
  const stateName = yield select(stateNameStore.get())
  const state = yield select(uiStore.get())
  const props = yield select(propsStore.get())

  const body = JSON.stringify({ state, props })
  const headers = {
    'Content-Type': 'application/json',
  }

  yield call(fetch, `/api/state/${stateName}`, { method: 'POST', body, headers })
}
