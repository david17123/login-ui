import React from 'react'
import { useSelector } from 'react-redux'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from './AppBar'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function Login() {
  const classes = useStyles()
  const loggedInUser = useSelector(state => state.loggedInUser)

  return (
    <React.Fragment>
      <AppBar />
      <Container className={classes.contentContainer}>
        {loggedInUser && <LandingPage />}
        {!loggedInUser && <LoginPage />}
      </Container>
    </React.Fragment>
  )
}
