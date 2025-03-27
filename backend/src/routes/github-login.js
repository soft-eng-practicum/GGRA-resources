import express from 'express'
import axios from 'axios'
import { Octokit } from '@octokit/rest'

const router = express.Router()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const TARGET_REPO = process.env.TARGET_REPO

// Redirect to GitHub OAuth
router.get('/auth/github', (req, res) => {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`
  res.redirect(redirectUri)
})

// GitHub OAuth callback
router.get('/github/callback', async (req, res) => {
  const code = req.query.code
  try {
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } },
    )

    const accessToken = tokenRes.data.access_token
    if (!accessToken) throw new Error('No access token received.')

    console.log(accessToken)

    const octokit = new Octokit({ auth: accessToken })

    const { data: user } = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })

    console.log(user.login)

    // Check if the user has access to the repo
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/collaborators/{username}/permission',
      {
        owner: 'soft-eng-practicum',
        repo: 'GGRA-resources',
        username: 'jankaltenegger',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )

    console.log(response)

    req.session.authenticated = true
    req.session.accessToken = accessToken
    req.session.username = user.login

    res.redirect('http://localhost:5173/GGRA-resources/admin')
  } catch (err) {
    console.error('OAuth error:', err.message)
    res.status(403).send('Access denied or repository not accessible.')
  }
})

export default router
