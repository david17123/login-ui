import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import { default as MUIAppBar } from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { logoutActionCreator } from '../reducer'

const useStyles = makeStyles((theme) => ({
  toolbarSpacer: {
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
}))

export default function AppBar() {
  const classes = useStyles()
  const dipatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  const handleLogout = () => {
    dipatch(logoutActionCreator())
  }

  return (
    <React.Fragment>
      <MUIAppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            MyApp
          </Typography>
          {loggedInUser && (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
        </Toolbar>
      </MUIAppBar>
      <div className={classes.toolbarSpacer} />
    </React.Fragment>
  )
}
