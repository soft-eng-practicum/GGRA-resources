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

const app = express()

// CORS to allow frontend communication
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://.github.io/GGRA-resources/',
    ],
    credentials: true,
  }),
)

app.use(express.json())

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production with HTTPS
  }),
)

// Static files (optional if needed for assets)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))

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
    ? 'http://localhost:5173/GGRA-resources/forbidden'
    : 'https://soft-eng-practicum.github.io/GGRA-resources/forbidden'

  res.redirect(redirectURL)
})

app.listen(3000)
