const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const axios = require('axios')
const router = express.Router()

const CLIENT_ID = undefined
const CLIENT_SECRET = process.env.CLIENT_SECRET

router.get('/auth/github', (req, res) => {
  if (CLIENT_ID) {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    res.json({ url: authUrl })
  } else {
    res.json({ url: '/access-denied' })
    console.error(
      'Server Error: Could not find CLIENT_ID variable, please check integrity of secrets.',
    )
  }
})

router.get('/github/callback', async (req, res) => {
  const code = req.query.code

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } },
    )

    const accessToken = tokenResponse.data.access_token
    res.send(
      `Successfully authorized! Got code ${code} and exchanged it for a user access token ending in ${accessToken.slice(-9)}`,
    )
  } catch (error) {
    console.error(
      'Error during OAuth process:',
      error.response?.data || error.message,
    )
    res.status(500).send('Authentication failed')
  }
})

module.exports = router
