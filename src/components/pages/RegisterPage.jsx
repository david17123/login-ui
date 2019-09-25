import PropTypes from 'prop-types'
import React from 'react'

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
    marginTop: theme.spacing(1),
  },
}))

export default function RegisterPage({ history }) {
  const classes = useStyles()
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [usernameError, setUsernameError] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')

  const validateForm = () => {
    let noError = true

    if (!email) {
      noError = false
      setEmailError('Email cannot be empty')
    } else if (!/^[^@]+@\w+\.\w+$/.test(email)) {
      noError = false
      setEmailError('Email is not valid')
    } else {
      setEmailError('')
    }

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

    if (validateForm()) {
      history.push('/register-confirm')
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
            Create an account!
          </Typography>
          <TextField
            className={classes.textInput}
            id="email"
            label="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            error={!!emailError}
            InputProps={{
              endAdornment: emailError && (
                <InputAdornment position="end">
                  <Tooltip title={emailError} placement="top">
                    <ErrorIcon color="error" data-testid="email-error-icon" />
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submitButton}
          >
            Register
          </Button>
          <Link
            component="button"
            onClick={() => history.push('/login')}
            className={classes.buttonLink}
          >
            Have an account? Login instead.
          </Link>
        </Box>
      </Paper>
    </Container>
  )
}

RegisterPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}
