import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Provider } from 'react-redux'

import LandingPage from './LandingPage'
import reduxStore from '../../redux/store'
import { loginActionCreator } from '../../redux/reducer'

describe('LandingPage test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  const renderComponentToTest = () => {
    reduxStore.dispatch(loginActionCreator({ username: 'SomeUser' }))
    const queryFuncs = render(
      <Provider store={reduxStore}>
        <LandingPage />
      </Provider>
    )

    return queryFuncs
  }

  it('should render welcome greeting', () => {
    const { getByText } = renderComponentToTest()
    expect(getByText(/welcome, someuser/i)).toBeVisible()
  })
})
