import React from 'react'
import { useDispatch } from 'react-redux'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import InputAdornment from '@material-ui/core/InputAdornment'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { default as ErrorIcon} from '@material-ui/icons/Error'
import { makeStyles } from '@material-ui/core'

import doLogin from '../logic/login'

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
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
  buttonLink: {
    textAlign: 'right',
  },
}))

export default function LoginPage({ history, location }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [usernameError, setUsernameError] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')

  const validateForm = () => {
    let noError = true
    if (!username) {
      noError = false
      setUsernameError('Username cannot be empty')
    } else {
      setUsernameError('')
    }

    if (!password) {
      noError = false
      setPasswordError('Password cannot be empty')
    } else {
      setPasswordError('')
    }

    return noError
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const redirectTo = location.state && location.state.from
      ? location.state.from.pathname
      : '/'

    if (validateForm()) {
      doLogin(username, password, dispatch).then((loginErrors) => {
        if (loginErrors) {
          if (loginErrors.username) {
            setUsernameError(loginErrors.username)
          }
          if (loginErrors.password) {
            setPasswordError(loginErrors.password)
          }
        } else {
          history.push(redirectTo)
        }
      })
    }
    return false
  }

  return (
    <Container className={classes.contentContainer}>
      <Paper className={classes.paper}>
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
            error={!!usernameError}
            InputProps={{
              endAdornment: usernameError && (
                <InputAdornment position="end">
                  <Tooltip title={usernameError} placement="top">
                    <ErrorIcon color="error" data-testid="username-error-icon" />
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
          <TextField
            className={classes.textInput}
            id="password"
            label="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            error={!!passwordError}
            InputProps={{
              endAdornment: passwordError && (
                <InputAdornment position="end">
                  <Tooltip title={passwordError} placement="top">
                    <ErrorIcon color="error" data-testid="password-error-icon" />
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
          <Link
            component="button"
            onClick={() => history.push('/forgot-login')}
            className={classes.buttonLink}
          >
            Forgot username or password
          </Link>
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
    </Container>
  )
}
