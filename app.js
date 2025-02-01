const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname)))

app.set('view engine', 'ejs')

const gitLoginRouter = require('./src/controllers/github-login')
app.use('/', gitLoginRouter)

app.listen(3000)
