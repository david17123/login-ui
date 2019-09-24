import { combineReducers } from 'redux'

export const actions = {
  LOGIN: 'login',
  LOGOUT: 'logout',
}

export const initialState = {
  loggedInUser: null,
}

export default function reducer(state = initialState, action) {
  let newState = state
  switch (action.type) {
    case actions.LOGIN:
      newState = {
        loggedInUser: action.user,
      }
      break
    case actions.LOGOUT:
      newState = {
        loggedInUser: null,
      }
      break
  }
  return newState
}
