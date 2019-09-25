import { cleanup, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

import RegisterPage from './RegisterPage'

describe('RegisterPage test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  const renderComponentToTest = () => {
    const mockHistory = {
      push: jest.fn(),
    }
    const queryFuncs = render(
      <RegisterPage history={mockHistory} />
    )

    return queryFuncs
  }

  it('should render empty register form', async () => {
    const { getByText, getByLabelText, getAllByRole } = renderComponentToTest()
    expect(getByText(/create an account/i)).toBeVisible()
    expect(getByLabelText('Email')).toBeVisible()
    expect(getByLabelText('Username')).toBeVisible()
    expect(getByLabelText('Password')).toBeVisible()
    expect(getByLabelText('Confirm password')).toBeVisible()

    const submitButton = getAllByRole('button')
      .filter(btn => /register/i.test(btn.textContent))
    expect(submitButton.length).toBe(1)
    expect(submitButton[0]).toBeVisible()

    const loginButton = getAllByRole('button')
      .filter(btn => /login instead/i.test(btn.textContent))
    expect(loginButton.length).toBe(1)
    expect(loginButton[0]).toBeVisible()
  })

  it('should render error on submitting empty form', () => {
    const { getAllByRole, getByTestId, queryByTestId } = renderComponentToTest()
    const submitButton = getAllByRole('button')
      .filter(btn => /register/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(getByTestId('email-error-icon')).toBeVisible()
    expect(getByTestId('username-error-icon')).toBeVisible()
    expect(getByTestId('password-error-icon')).toBeVisible()
    expect(queryByTestId('confirm-password-error-icon')).toBeFalsy()
  })

  it('should render error on submitting invalid email', () => {
    const { getAllByRole, getByTestId, getByLabelText } = renderComponentToTest()

    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid email' } })
    const submitButton = getAllByRole('button')
      .filter(btn => /register/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(getByTestId('email-error-icon')).toBeVisible()
  })

  it('should render error on submitting unmatched passwords', () => {
    const { getAllByRole, getByTestId, getByLabelText } = renderComponentToTest()

    fireEvent.change(getByLabelText('Password'), { target: { value: 'pass1' } })
    fireEvent.change(getByLabelText('Confirm password'), { target: { value: 'pass2' } })
    const submitButton = getAllByRole('button')
      .filter(btn => /register/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(getByTestId('confirm-password-error-icon')).toBeVisible()
  })

  it('should render no error on valid form', () => {
    const { getAllByRole, getByLabelText, queryByTestId } = renderComponentToTest()

    fireEvent.change(getByLabelText('Email'), { target: { value: 'email@example.com' } })
    fireEvent.change(getByLabelText('Username'), { target: { value: 'some.username' } })
    fireEvent.change(getByLabelText('Password'), { target: { value: 'pass1' } })
    fireEvent.change(getByLabelText('Confirm password'), { target: { value: 'pass1' } })
    const submitButton = getAllByRole('button')
      .filter(btn => /register/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(queryByTestId('email-error-icon')).toBeFalsy()
    expect(queryByTestId('username-error-icon')).toBeFalsy()
    expect(queryByTestId('password-error-icon')).toBeFalsy()
    expect(queryByTestId('confirm-password-error-icon')).toBeFalsy()
  })
})
