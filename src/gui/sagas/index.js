import sagas from './intents'
import { unhandledErrors } from '../redux/reducers'

export default store => function* () {
  function* errorHandlingSagas() {
    try {
      yield sagas()
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.error('saga exception', ex)
      store.dispatch(unhandledErrors.add({
        ...ex,
        timestamp: (new Date().getTime()),
        message: ex.message,
        stack: ex.stack,
      }))
      yield errorHandlingSagas()
    }
  }

  yield errorHandlingSagas()
}
