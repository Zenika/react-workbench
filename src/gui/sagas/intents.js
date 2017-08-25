import { takeLatest } from 'redux-saga/effects'
import * as state from './component/state'

export default function* () {
  yield takeLatest('@trampss/SET_STATE', action => state.setUiState(action.payload))
  yield takeLatest('UI_CLICK_SET_STATE', state.setComponentState)
}
