import reducer, {
  initialState,
  loginActionCreator,
  logoutActionCreator
} from './reducer'

describe('LoginPage test', () => {
  it('should return the correct updated state after login', () => {
    const user = {
      username: 'some.user',
    }
    const action = loginActionCreator(user)
    const finalState = reducer(initialState, action)
    expect(finalState.loggedInUser).toBeTruthy()
    expect(finalState.loggedInUser.username).toBe(user.username)
  })

  it('should return the correct updated state after logout', () => {
    const user = {
      username: 'some.user',
    }
    const state = {
      ...initialState,
      loggedInUser: user,
    }
    const action = logoutActionCreator()
    const finalState = reducer(state, action)
    expect(finalState.loggedInUser).toBeFalsy()
  })
})
