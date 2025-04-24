import express from 'express'
import { Octokit } from '@octokit/rest'

const router = express.Router()

router.get('/api/getProviders', async (req, res) => {
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

    console.log(content)

    return res.json({ content })
  } catch (err) {
    console.error('Error getting providers', err)
    return res.status(500).json({ error: err.message })
  }
})

router.get('/api/getCategories', async(req, res) => {
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

    console.log(content)

    return res.json({ content })
  } catch (err) {
    console.error('Error getting categories', err)
    return res.status(500).json({ error: err.message })
  }
})

export default router
