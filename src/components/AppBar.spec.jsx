import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Provider } from 'react-redux'

import AppBar from './AppBar'
import reduxStore from '../redux/store'
import { loginActionCreator } from '../redux/reducer'

describe('AppBar test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  const renderComponentToTest = (loggedIn = false) => {
    if (loggedIn) {
      reduxStore.dispatch(loginActionCreator({ username: 'SomeUser' }))
    }
    const queryFuncs = render(
      <Provider store={reduxStore}>
        <AppBar />
      </Provider>
    )

    return queryFuncs
  }

  it('should render app name', () => {
    const { getByText } = renderComponentToTest()
    expect(getByText(/myapp/i)).toBeVisible()
  })

  it('should not render logout button for not logged in state', () => {
    const { queryByText } = renderComponentToTest(false)
    expect(queryByText('logout')).toBeFalsy()
  })

  it('should render logout button for not logged in state', () => {
    const { getByText } = renderComponentToTest(true)
    expect(getByText(/logout/i)).toBeVisible()
  })
})
