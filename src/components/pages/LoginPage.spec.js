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
    const mockHistory = {
      push: jest.fn(),
    }
    const mockLocation = {
      pathname: '/login',
    }
    const { getByText, getAllByRole } = render(
      <Provider store={reduxStore}>
        <LoginPage history={mockHistory} location={mockLocation} />
      </Provider>
    )
    expect(getByText('Login to your account')).toBeVisible()
    expect(getByText('Username')).toBeVisible()
    expect(getByText('Password')).toBeVisible()

    const submitButton = getAllByRole('button')
      .filter(btn => /login/i.test(btn.textContent))
    expect(submitButton.length).toBe(1)
    expect(submitButton[0]).toBeVisible()
  })

  it('should render error on submitting empty form', async () => {
    const mockHistory = {
      push: jest.fn(),
    }
    const mockLocation = {
      pathname: '/login',
    }
    const { getAllByRole, findByTestId } = render(
      <Provider store={reduxStore}>
        <LoginPage history={mockHistory} location={mockLocation} />
      </Provider>
    )
    const submitButton = getAllByRole('button')
      .filter(btn => /login/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(await findByTestId('username-error-icon')).toBeVisible()
    expect(await findByTestId('password-error-icon')).toBeVisible()
  })
})
