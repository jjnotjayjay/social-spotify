import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const PaddedButton = withStyles({
  root: { marginTop: '4vh' }
})(Button)

export default function Login() {
  return (
    <div className="centered shadow">
      <img id="login-logo" src="assets/logo.png"/>
      <PaddedButton href="/login" size="large" color="primary" variant="contained">Login to Spotify</PaddedButton>
    </div>
  )
}
