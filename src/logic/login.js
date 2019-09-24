import { actions } from '../reducer'

/**
 * Log in with the supplied credentials. This will update redux store upon
 * successful login, otherwise will return error object with the following
 * attributes:
 *   - username: username-related error
 *   - password: password-related error
 *
 * @param {string} username
 * @param {string} password
 */
export default async function doLogin(username, password, dispatch) {
  // This is just a mock of a proper authentication process
  const validCredentials = [
    { username: 'john.smith', password: 'logmein' },
  ]

  const error = {}
  let matchedUser = null
  for (const cred of validCredentials) {
    if (cred.username === username) {
      if (cred.password === password) {
        matchedUser = {
          username: cred.username
        }
      } else {
        error.password = 'Invalid password'
        break
      }
    }
  }
  if (!matchedUser && !error.password) {
    error.username = 'Unrecognised username'
  }

  if (matchedUser) {
    dispatch({ type: actions.LOGIN, user: matchedUser })
    return null
  }
  return error
}
