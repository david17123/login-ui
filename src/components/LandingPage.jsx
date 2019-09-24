import React from 'react'
import { useSelector } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}))

export default function LandingPage() {
  const classes = useStyles()
  const loggedInUser = useSelector(state => state.loggedInUser)

  return (
    <Paper className={classes.contentContainer}>
      <Typography variant="h5" className={classes.title}>
        Welcome, {loggedInUser.username}!
      </Typography>
      <Typography variant="body1">
        This is your dashboard. It shows information that is most relevant to
        you.
      </Typography>
    </Paper>
  )
}
