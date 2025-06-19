import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

import gitLoginRouter from './src/routes/github-login.js'
import gitCommitRouter from './src/routes/github-commit.js'
import gitGetResCatsRouter from './src/routes/github-getrescats.js'
import gitDelResCatsRouter from './src/routes/github-delrescats.js'
import gitPutResCatsRouter from './src/routes/github-putrescats.js'
import pingRouter from './src/routes/ping.js'

const app = express()
const PORT = process.env.PORT || 3000

app.set('trust proxy', 1)
app.set('etag', false)

// CORS to allow frontend communication
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://soft-eng-practicum.github.io',
    ],
    credentials: true,
  }),
)

app.use(express.json())

app.use(
  session({
    name: 'connect.sid',
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,           // JS can’t read it
      secure:   true,           // HTTPS-only (you said production-only)
      sameSite: 'none',         // allow cross-site
      maxAge:   24 * 60 * 60 * 1000, // 1 day
    },
  })
)

// Static files (optional if needed for assets)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))

app.options('*', cors())

app.use(pingRouter)

// GitHub OAuth routes
app.use('/', gitLoginRouter)

app.use(gitCommitRouter)
app.use(gitGetResCatsRouter)
app.use(gitDelResCatsRouter)
app.use(gitPutResCatsRouter)

// Auth check endpoint for React frontend
app.get('/api/check-auth', (req, res) => {
  res.json({ authenticated: !!req.session.authenticated })
})

// Route for failed login or denied repo access
app.get('/access-denied', (req, res) => {
  const isDev = process.env.NODE_ENV !== 'production'
  const redirectURL = isDev
    ? 'http://localhost:5173/GGRA-resources/#/forbidden'
    : 'https://soft-eng-practicum.github.io/GGRA-resources/#/forbidden'

  res.redirect(redirectURL)
})

app.listen(PORT)
