import React from 'react'

import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  loginDetails: {
    fontWeight: 'bold',
  },
}))

export default function ForgotLoginConfirmPage() {
  const classes = useStyles()

  return (
    <Container className={classes.contentContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Check your inbox!
        </Typography>
        <Typography variant="body1">
          Normally the supplied email will be validated and checked against the
          user database and recovery email will only be sent of there is an
          account associated with the email. However, for demostration purposes
          only, please login with username&nbsp;
          <Typography
            component="span"
            className={classes.loginDetails}
            display="inline"
          >
            john.smith
          </Typography>
          &nbsp;and password&nbsp;
          <Typography
            component="span"
            className={classes.loginDetails}
            display="inline"
          >
            logmein
          </Typography>.&nbsp;
          <Link href="/#/login">Go to login page.</Link>
        </Typography>
      </Paper>
    </Container>
  )
}
