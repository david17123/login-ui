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

  const renderComponentToTest = () => {
    const mockHistory = {
      push: jest.fn(),
    }
    const mockLocation = {
      pathname: '/login',
    }
    const queryFuncs = render(
      <Provider store={reduxStore}>
        <LoginPage history={mockHistory} location={mockLocation} />
      </Provider>
    )

    return queryFuncs
  }

  it('should render empty login form', () => {
    const { getByText, getAllByRole } = renderComponentToTest()
    expect(getByText('Login to your account')).toBeVisible()
    expect(getByText('Username')).toBeVisible()
    expect(getByText('Password')).toBeVisible()

    const submitButton = getAllByRole('button')
      .filter(btn => /login/i.test(btn.textContent))
    expect(submitButton.length).toBe(1)
    expect(submitButton[0]).toBeVisible()

    const forgotButton = getAllByRole('button')
      .filter(btn => /forgot username or password/i.test(btn.textContent))
    expect(forgotButton.length).toBe(1)
    expect(forgotButton[0]).toBeVisible()

    const registerButton = getAllByRole('button')
      .filter(btn => /create an account/i.test(btn.textContent))
    expect(registerButton.length).toBe(1)
    expect(registerButton[0]).toBeVisible()
  })

  it('should render error on submitting empty form', () => {
    const { getAllByRole, getByTestId } = renderComponentToTest()
    const submitButton = getAllByRole('button')
      .filter(btn => /login/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(getByTestId('username-error-icon')).toBeVisible()
    expect(getByTestId('password-error-icon')).toBeVisible()
  })
})
