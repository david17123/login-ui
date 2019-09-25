import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AppBar from './AppBar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import ForgotLoginPage from './pages/ForgotLoginPage'
import ForgotLoginConfirmPage from './pages/ForgotLoginConfirmPage'

const ProtectedHOC = (Component) => (...props) => {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const { location } = props[0]

  if (loggedInUser) {
    return <Component {...props} />
  }
  return <Redirect to={{
    pathname: '/login',
    state: { from: location },
  }} />
}

export default function Main() {
  return (
    <React.Fragment>
      <AppBar />
      <Router>
        <Switch>
          <Route exact path="/" component={ProtectedHOC(LandingPage)} />
          <Route path="/login" component={LoginPage} />
          <Route path="/forgot-login" component={ForgotLoginPage} />
          <Route path="/forgot-login-confirm" component={ForgotLoginConfirmPage} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}
