import { takeLatest } from 'redux-saga/effects'

export default function* () {
  yield takeLatest(action => /@trampss.*/.test(action.type), () => {
    console.log('Ho TRAMPSS !!')
  })
}
