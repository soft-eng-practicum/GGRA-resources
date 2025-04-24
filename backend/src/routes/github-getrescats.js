import express from 'express'
import { Octokit } from '@octokit/rest'

const router = express.Router()

router.get('/api/getResources', async (req, res) => {
  try {
    const userToken = req.session.accessToken
    const octokit = new Octokit({ auth: userToken })

    const [owner, repo] = process.env.TARGET_REPO.split('/')
    const filePath = 'public/ggra-providers.json'
    const branch = 'main'

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
    console.error('Error getting resources', err)
    return res.status(500).json({ error: err.message })
  }
})

export default router
