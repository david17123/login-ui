import React from 'react'
import { useSelector } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export default function LandingPage() {
  const loggedInUser = useSelector(state => state.loggedInUser)

  return (
    <Paper>
      <Typography variant="h5">Welcome, {loggedInUser.username}!</Typography>
      <Typography variant="p">
        This is your dashboard. It shows information that is most relevant to
        you.
      </Typography>
    </Paper>
  )
}
