import PropTypes from 'prop-types'
import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import InputAdornment from '@material-ui/core/InputAdornment'
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
}))

export default function ForgotLoginPage({ history }) {
  const classes = useStyles()
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')

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

    return noError
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateForm()) {
      history.push('/forgot-login-confirm')
    }
    return false
  }

  const inputFocus = React.createRef()
  React.useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus()
    }
  }, [])

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
            Recover your account
          </Typography>
          <Typography variant="body1" className={classes.title}>
            We can send a recovery email to the email linked to your account.
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
            inputRef={inputFocus}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submitButton}
          >
            Send recovery email
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

ForgotLoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}
