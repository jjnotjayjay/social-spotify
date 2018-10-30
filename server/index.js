const express = require('express')
const path = require('path')
const querystring = require('querystring')
const requestPromise = require('request-promise')
const { MongoClient } = require('mongodb')
require('dotenv/config')

const clientId = 'ee3918a44251433a87cbc842f68bc29f'
const clientSecret = process.env.CLIENT_SECRET
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

  requestPromise.post(tokenRequest)
    .then(tokenData => {
      const accessToken = tokenData.access_token
      const refreshToken = tokenData.refresh_token

      const userDataRequest = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + accessToken },
        json: true
      }

      return requestPromise.get(userDataRequest)
        .then(userDataResponse => {
          const { email, uri } = userDataResponse
          const userData = {
            displayName: userDataResponse.display_name,
            email,
            image: userDataResponse.images[0].url,
            uri,
            accessToken,
            refreshToken
          }
          MongoClient
            .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
            .then(client => {
              client
                .db()
                .collection('users')
                .findOneAndReplace({ email }, userData, { upsert: true })
            })
            .then(() => {
              res.redirect('/#playlist?' +
              querystring.stringify({
                accessToken,
                refreshToken,
                displayName: userData.displayName,
                image: userData.image
              }))
            })
        })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

app.listen(7777)
