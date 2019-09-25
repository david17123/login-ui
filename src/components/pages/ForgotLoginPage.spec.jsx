import { cleanup, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

import ForgotLoginPage from './ForgotLoginPage'

describe('ForgotLoginPage test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  const renderComponentToTest = () => {
    const mockHistory = {
      push: jest.fn(),
    }
    const queryFuncs = render(
      <ForgotLoginPage history={mockHistory} />
    )

    return queryFuncs
  }

  it('should render empty forgot login form', async () => {
    const { getByText, getByLabelText, getAllByRole } = renderComponentToTest()
    expect(getByText(/recover your account/i)).toBeVisible()
    expect(getByLabelText('Email')).toBeVisible()

    const submitButton = getAllByRole('button')
      .filter(btn => /send recovery email/i.test(btn.textContent))
    expect(submitButton.length).toBe(1)
    expect(submitButton[0]).toBeVisible()
  })

  it('should render error on submitting empty form', () => {
    const { getAllByRole, getByTestId, queryByTestId } = renderComponentToTest()
    const submitButton = getAllByRole('button')
      .filter(btn => /send recovery email/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(getByTestId('email-error-icon')).toBeVisible()
  })

  it('should render error on submitting invalid email', () => {
    const { getAllByRole, getByTestId, getByLabelText } = renderComponentToTest()

    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid email' } })
    const submitButton = getAllByRole('button')
      .filter(btn => /send recovery email/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(getByTestId('email-error-icon')).toBeVisible()
  })

  it('should render no error on valid form', () => {
    const { getAllByRole, getByLabelText, queryByTestId } = renderComponentToTest()

    fireEvent.change(getByLabelText('Email'), { target: { value: 'email@example.com' } })
    const submitButton = getAllByRole('button')
      .filter(btn => /send recovery email/i.test(btn.textContent))[0]
    fireEvent.click(submitButton)

    expect(queryByTestId('email-error-icon')).toBeFalsy()
  })
})
