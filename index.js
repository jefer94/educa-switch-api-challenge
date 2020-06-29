const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.options('*', cors()) // enable pre-flight

app.use(bodyParser.json())

app.post('/v1/github/token', async (req, res) => {
  const { code, state, githubId, githubSecret, redirectUri } = req.body

  try {
    const tokenRequest = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: githubId,
      client_secret: githubSecret,
      redirect_uri: redirectUri,
      code,
      state
    }, {
      headers: {
        accept: 'application/json'
        // Host: window.location.origin
      }
    })
    res.json(tokenRequest.data)
  }
  catch(e) {
    res.json(e.data)
  }
})

app.listen(process.env.PORT || 3000)
