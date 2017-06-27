import Promise from 'bluebird'
import Relay from 'react-relay'
import snackbar from './snackbar'

const DEFAULT_ERROR_MESSAGE = 'En feil oppstod. Vennligst last siden på nytt og prøv igjen senere'

export default function mutate(mutation, displayError = true) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(mutation, {
      onFailure: err => {
        if (displayError) {
          try {
            const error = err.getError().source.errors[0]
            const message = error.type === 'UserFriendlyError'
              ? error.message
              : DEFAULT_ERROR_MESSAGE

            snackbar(`Feil: ${message}`)
          } catch (e) {
            snackbar(DEFAULT_ERROR_MESSAGE)
          }
        }

        return reject(err.getError())
      },
      onSuccess: res => {
        return resolve(res)
      }
    })
  })
}
