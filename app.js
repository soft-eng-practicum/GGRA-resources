const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname)))
app.use(express.static('public'))

app.set('view engine', 'ejs')

const gitLoginRouter = require('./src/routes/github-login')
app.use('/', gitLoginRouter)

app.listen(3000)
