import React from 'react'
import { useSelector } from 'react-redux'

import { default as MUIAppBar } from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  toolbarSpacer: {
    ...theme.mixins.toolbar,
  },
}))

export default function AppBar() {
  const classes = useStyles()
  const loggedInUser = useSelector(state => state.loggedInUser)

  return (
    <React.Fragment>
      <MUIAppBar>
        <Toolbar>
          <Typography variant="h6">
            MyApp
          </Typography>
        </Toolbar>
      </MUIAppBar>
      <div className={classes.toolbarSpacer} />
    </React.Fragment>
  )
}
