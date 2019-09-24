import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    width: theme.spacing(60),
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  textInput: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(1),
  },
}))

export default function LoginPage() {
  const classes = useStyles()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Logging in...')
    return false
  }

  return (
    <Paper className={classes.contentContainer}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h5" className={classes.title}>
          Login to your account
        </Typography>
        <TextField
          className={classes.textInput}
          id="username"
          label="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <TextField
          className={classes.textInput}
          id="password"
          label="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          type="password"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.submitButton}
        >
          Login
        </Button>
      </Box>
    </Paper>
  )
}
