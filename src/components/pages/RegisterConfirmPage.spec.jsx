import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

import RegisterConfirmPage from './RegisterConfirmPage'

describe('RegisterConfirmPage test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  const renderComponentToTest = () => {
    const queryFuncs = render(<RegisterConfirmPage />)
    return queryFuncs
  }

  it('should render welcome greeting', () => {
    const { getByText, getByRole } = renderComponentToTest()
    expect(getByText(/account created/i)).toBeVisible()
    expect(getByRole('link')).toBeVisible()
  })
})
