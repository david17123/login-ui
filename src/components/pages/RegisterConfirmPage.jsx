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

export default function RegisterConfirmPage() {
  const classes = useStyles()

  return (
    <Container className={classes.contentContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Account created!
        </Typography>
        <Typography variant="body1">
          For a complete and proper registration, the user will be sent an email
          to confirm their email address and properly activate the account.
          However, since this is just a demo app, none of the actual account
          creation routine is executed. Please login with username&nbsp;
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
