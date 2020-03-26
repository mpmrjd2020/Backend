const express = require('express')

const parser = require('body-parser')

const cors = require('cors')
const app = express()

const eventsController = require('./controllers/eventsControls')

app.use(cors())
app.use(express.json())

app.use(parser.urlencoded({extended: true}))
app.use(parser.json())



app.use('/', eventsController)


app.listen(8080, () => console.log('Server running on port 8080!'))