const express = require('express')
const path = require('path')
const querystring = require('querystring')
const request = require('request')

const clientId = 'ee3918a44251433a87cbc842f68bc29f'
const clientSecret = 'd380cc6c46cd4326bc0cff2d2fd8e3c7'
const redirectURI = 'http://localhost:7777/callback'

const app = express()
app.use(express.static(path.join(__dirname, '/public')))

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-modify-playback-state'

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectURI,
      scope: scope
    }))
})

app.get('/callback', (req, res) => {
  const code = req.query.code || null

  const tokenRequest = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    form: {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectURI
    },
    json: true
  }

  request.post(tokenRequest, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token
      const refreshToken = body.refresh_token

      const userDataRequest = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + accessToken },
        json: true
      }

      request.get(userDataRequest, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log(body)
        }
        else {
          console.log(error)
        }
      })
    }
    else {
      console.log(error)
    }
  })
})

app.listen(7777)
