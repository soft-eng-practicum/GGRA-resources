const express = require('express')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const app = express()

app.use(express.static(path.join(__dirname)))
app.use(express.static(path.join(__dirname, "build")))
app.use(express.static('public'))

const gitLoginRouter = require('./src/routes/github-login')
app.use('/', gitLoginRouter)

const forbidden403 = require('./src/pages/forbidden-403.jsx').default

app.get('/access-denied', (req, res) => {
  const forbiddenPage = ReactDOMServer.renderToString(
    React.createElement(forbidden403),
  )
  res.status(403).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>403 Forbidden</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; color: #721c24; }
            .container { max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background: #f8d7da; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
        </style>
    </head>
    <body>
        <div class="container">${forbiddenPage}</div>
    </body>
    </html>
  `)
})

app.listen(3000)
