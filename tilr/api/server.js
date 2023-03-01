const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const cors = require('cors')

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(routes)

const server = app.listen(8000, () => {
  console.log('Server running on 8000!')
})

module.exports = server
