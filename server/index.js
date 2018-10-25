const express = require('express')
const path = require('path')
const querystring = require('querystring')

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
  console.log('Get request received!')
  console.log(req)
  res.json(req.query.code)
})

app.listen(7777)
