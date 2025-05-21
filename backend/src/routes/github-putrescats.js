import express from 'express'
import { Octokit } from '@octokit/rest'

const router = express.Router()

function ensureLoggedIn(req, res, next) {
  if (req.session?.authenticated && req.session?.accessToken) return next()
  return res.status(401).json({ error: 'Not signed in' })
}

router.put('/api/editProvider', ensureLoggedIn, async (req, res) => {
  const { id } = req.body
  if (typeof id !== 'number') {
    return res.status(400).json({ error: 'Must specify provider id to edit' })
  }

  try {
    const octokit = new Octokit({ auth: req.session.accessToken })
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

    let found = false
    const updatedArr = arr.map(provider => {
      if (provider.id === id) {
        found = true
        return { ...provider, ...req.body }
      }
      return provider
    })

    if (!found) {
      return res.status(404).json({ error: `No provider found with id ${id}` })
    }

    const updatedBase64 = Buffer.from(
      JSON.stringify(updatedArr, null, 2),
      'utf8'
    ).toString('base64')

    const { data: commit } = await octokit.request(
      'PUT /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: filePath,
        branch,
        message: `CHORE: edit provider ${id}`,
        content: updatedBase64,
        sha: file.sha,
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      }
    )

    return res.json({ sha: commit.content.sha })
  } catch (err) {
    console.error('Error editing provider →', err)
    if (err.status === 409) {
      return res
        .status(409)
        .json({ error: 'Conflict: please retry your request' })
    }
    return res.status(500).json({ error: err.message })
  }
})

router.put('/api/editCategory', ensureLoggedIn, async (req, res) => {
  const { catId, type } = req.body
  if (typeof catId !== 'number' || typeof type !== 'string') {
    return res
      .status(400)
      .json({ error: 'Must specify category ID and new type' })
  }

  try {
    const octokit = new Octokit({ auth: req.session.accessToken })
    const [owner, repo] = process.env.TARGET_REPO.split('/')
    const filePath = 'ggra-categories.json'
    const branch = 'storagebranch'

    const { data: file } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    })

    const content = Buffer.from(file.content, 'base64').toString('utf8')
    const arr = JSON.parse(content)

    let found = false
    const updatedArr = arr.map(cat => {
      if (cat.catId === catId) {
        found = true
        return { ...cat, type }
      }
      return cat
    })

    if (!found) {
      return res
        .status(404)
        .json({ error: `No category found with catId ${catId}` })
    }

    const updatedBase64 = Buffer.from(
      JSON.stringify(updatedArr, null, 2),
      'utf8'
    ).toString('base64')

    const { data: commit } = await octokit.request(
      'PUT /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: filePath,
        branch,
        message: `CHORE: edit category ${catId}`,
        content: updatedBase64,
        sha: file.sha,
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      }
    )

    return res.json({ sha: commit.content.sha })
  } catch (err) {
    console.error('Error editing category →', err)
    if (err.status === 409) {
      return res
        .status(409)
        .json({ error: 'Conflict: please retry your request' })
    }
    return res.status(500).json({ error: err.message })
  }
})

export default router
