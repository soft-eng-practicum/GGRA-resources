// src/routes/resources.js
import express from 'express'
import { Octokit } from '@octokit/rest'

const router = express.Router()

// helper to make sure only authenticated users hit this endpoint
function ensureLoggedIn(req, res, next) {
  if (req.session?.authenticated && req.session?.accessToken) return next()
  return res.status(401).json({ error: 'Not signed in' })
}

router.post('/api/resources', ensureLoggedIn, async (req, res) => {
  try {
    // 1) grab the user’s token from session
    const userToken = req.session.accessToken
    const octokit = new Octokit({ auth: userToken })

    // 2) split your TARGET_REPO into owner and repo
    const [owner, repo] = process.env.TARGET_REPO.split('/')
    const filePath = 'ggra-providers.json'
    const branch = 'gh-pages'

    // 3) fetch the current file (to get content & sha)
    const { data: file } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    })

    console.log(file)

    // 4) decode from base64, parse to array, append new item
    const content = Buffer.from(file.content, 'base64').toString('utf8')
    const arr = JSON.parse(content)
    arr.push(req.body) // your form JSON goes here

    // 5) re-encode updated array
    const updatedBase64 = Buffer.from(
      JSON.stringify(arr, null, 2),
      'utf8',
    ).toString('base64')

    // 6) push as a new commit
    const { data: commit } = await octokit.request(
      'PUT /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: filePath,
        branch,
        message: `TEST CHORE: add "${req.body.name}" resource`,
        content: updatedBase64,
        sha: file.sha, // don’t hard-code—use the GET’s file.sha
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )

    // 7) respond with the new commit SHA
    return res.json({ sha: commit.content.sha })
  } catch (err) {
    console.error('Error saving resource →', err)
    // if someone else pushed meanwhile you'll get a sha mismatch:
    if (err.status === 409) {
      return res
        .status(409)
        .json({ error: 'Conflict: please retry your request' })
    }
    return res.status(500).json({ error: err.message })
  }
})

export default router
