import express from 'express'
import { Octokit } from '@octokit/rest'

const router = express.Router()

function ensureLoggedIn(req, res, next) {
  if (req.session?.authenticated && req.session?.accessToken) return next()
  return res.status(401).json({ error: 'Not signed in' })
}

router.delete('/api/deleteProvider', ensureLoggedIn, async (req, res) => {
  const { id } = req.body
  if (typeof id !== 'number') {
    return res.status(400).json({ error: 'Must specify provider id to delete' })
  }

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

    const filtered = arr.filter((provider) => provider.id !== id)
    if (filtered.length === arr.length) {
      return res.status(404).json({ error: `No provider found with id ${id}` })
    }

    const updatedBase64 = Buffer.from(
      JSON.stringify(filtered, null, 2),
      'utf8',
    ).toString('base64')

    const { data: commit } = await octokit.request(
      'PUT /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: filePath,
        branch,
        message: `CHORE: delete provider id ${id}`,
        content: updatedBase64,
        sha: file.sha,
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      },
    )

    return res.json({ sha: commit.content.sha })
  } catch (err) {
    console.error('Error deleting provider →', err)
    if (err.status === 409) {
      return res
        .status(409)
        .json({ error: 'Conflict: please retry your request' })
    }
    return res.status(500).json({ error: err.message })
  }
})

router.delete('/api/deleteCategory', ensureLoggedIn, async (req, res) => {
  const { catId } = req.body
  if (typeof catId != 'number') {
    return res.status(400).json({ error: 'Must specify category ID to delete' })
  }

  try {
    const userToken = req.session.accessToken
    const octokit = new Octokit({ auth: userToken })

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

    const filtered = arr.filter((cat) => cat.catId !== catId)
    if (filtered.length === arr.length) {
      return res
        .status(404)
        .json({ error: `No category found with catId ${catId}` })
    }

    const updatedBase64 = Buffer.from(
      JSON.stringify(filtered, null, 2),
      'utf8',
    ).toString('base64')

    const { data: commit } = await octokit.request(
      'PUT /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: filePath,
        branch,
        message: `CHORE: delete category id ${catId}`,
        content: updatedBase64,
        sha: file.sha,
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      },
    )

    return res.json({ sha: commit.content.sha })
  } catch (err) {
    console.error('Error deleting category →', err)
    if (err.status === 409) {
      return res
        .status(409)
        .json({ error: 'Conflict: please retry your request' })
    }
    return res.status(500).json({ error: err.message })
  }
})

export default router
