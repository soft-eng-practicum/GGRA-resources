import express from 'express'
import axios from 'axios'
import { Octokit } from '@octokit/rest'

const router = express.Router()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const TARGET_REPO = process.env.TARGET_REPO

router.get('/auth/github', (req, res) => {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`
  res.redirect(redirectUri)
})

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

    const octokit = new Octokit({ auth: accessToken })

    const { data: user } = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })

    // Check if the user has access to the repo
    const { data: permissionData } = await octokit.request(
      'GET /repos/{owner}/{repo}/collaborators/{username}/permission',
      {
        owner: TARGET_REPO.split('/')[0],
        repo: TARGET_REPO.split('/')[1],
        username: user.login,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )

    const allowedPermissions = ['write', 'admin']
    if (!allowedPermissions.includes(permissionData.permission)) {
      throw new Error(
        'You do not have the necessary permissions to view this page.',
      )
    }

    req.session.authenticated = true
    req.session.accessToken = accessToken
    req.session.username = user.login

    res.redirect('https://soft-eng-practicum.github.io/GGRA-resources/#/admin')
  } catch (err) {
    console.error('Authentication error:', err.message)
    res.redirect('/access-denied')
  }
})

export default router
