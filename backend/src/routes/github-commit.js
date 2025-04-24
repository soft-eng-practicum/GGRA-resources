import express from 'express'
import { Octokit } from '@octokit/rest'

const router = express.Router()

function ensureLoggedIn(req, res, next) {
  if (req.session?.authenticated && req.session?.accessToken) return next()
  return res.status(401).json({ error: 'Not signed in' })
}

router.post('/api/resources', ensureLoggedIn, async (req, res) => {
  try {
    const userToken = req.session.accessToken
    const octokit = new Octokit({ auth: userToken })

    const [owner, repo] = process.env.TARGET_REPO.split('/')
    const filePath = 'ggra-providers.json'
    const branch = 'storagebranch'

    const { data: file } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    })

    const content = Buffer.from(file.content, 'base64').toString('utf8')
    const arr = JSON.parse(content)

    const nextId = arr.reduce((max, r) => Math.max(max, r.id), 0) + 1

    const newResource = {
      id: nextId,
      catId: req.body.catId,
      name: req.body.name,
      description: req.body.description,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      website: req.body.website,
      email: req.body.email,
      photo: req.body.photo,
      lng: req.body.lng,
      lat: req.body.lat,
      uploadedPhoto: req.body.uploadedPhoto,
      cat: req.body.cat,
    }

    arr.push(newResource)

    const updatedBase64 = Buffer.from(
      JSON.stringify(arr, null, 2),
      'utf8',
    ).toString('base64')

    const { data: commit } = await octokit.request(
      'PUT /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: filePath,
        branch,
        message: `TEST CHORE: add "${req.body.name}" resource`,
        content: updatedBase64,
        sha: file.sha,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )

    return res.json({ sha: commit.content.sha })
  } catch (err) {
    console.error('Error saving resource →', err)
    if (err.status === 409) {
      return res
        .status(409)
        .json({ error: 'Conflict: please retry your request' })
    }
    return res.status(500).json({ error: err.message })
  }
})

export default router
