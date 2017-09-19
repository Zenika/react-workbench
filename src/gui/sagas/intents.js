import { takeLatest } from 'redux-saga/effects'
import * as state from './component/state'
import * as readme from './documentation/readme'

export default function* () {
  yield takeLatest('@trampss/SET_STATE', action => state.setUiState(action.payload))
  yield takeLatest('UI_CLICK_SET_STATE', state.setComponentState)
  yield takeLatest('UI_CLICK_SAVE_README', readme.saveReadme)
}
