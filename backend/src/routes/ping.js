import express from 'express'
import cors from 'cors'

const router = express.Router()

const pingCors = cors({
  origin: [
    'http://localhost:5173',
    'https://soft-eng-practicum.github.io'
  ],
  credentials: true,
})

router.options('/ping', pingCors)

router.get('/ping', pingCors, (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    Pragma:        'no-cache',
    Expires:       '0',
    'Access-Control-Allow-Origin':  req.headers.origin,
    'Access-Control-Allow-Credentials': 'true',
  })
  res.status(200).send('pong')
})

export default router
