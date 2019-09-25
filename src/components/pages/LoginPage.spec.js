import { cleanup, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Provider } from 'react-redux'

import LoginPage from './LoginPage'
import reduxStore from '../../redux/store'

describe('LoginPage test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should render empty login form', async () => {
    const { getByText, getByRole } = render(
      <Provider store={reduxStore}>
        <LoginPage />
      </Provider>
    )
    expect(getByText('Login to your account')).toBeVisible()
    expect(getByText('Username')).toBeVisible()
    expect(getByText('Password')).toBeVisible()
    expect(getByRole('button')).toBeVisible()
  })

  it('should render error on submitting empty form', async () => {
    const { getByRole, getByTestId, getByText } = render(
      <Provider store={reduxStore}>
        <LoginPage />
      </Provider>
    )
    const submitButton = getByRole('button')
    fireEvent.click(submitButton)

    expect(getByTestId('username-error-icon')).toBeVisible()
    expect(getByTestId('password-error-icon')).toBeVisible()
  })
})
