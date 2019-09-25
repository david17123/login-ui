import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

import ForgotLoginConfirmPage from './ForgotLoginConfirmPage'

describe('ForgotLoginConfirmPage test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  const renderComponentToTest = () => {
    const queryFuncs = render(<ForgotLoginConfirmPage />)
    return queryFuncs
  }

  it('should render welcome greeting', () => {
    const { getByText, getByRole } = renderComponentToTest()
    expect(getByText(/check your inbox/i)).toBeVisible()
    expect(getByRole('link')).toBeVisible()
  })
})
