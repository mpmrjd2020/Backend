const express = require('express')
// 1. Require body-parser and save it to the variable parser.
const parser = require('body-parser')

const app = express()

const eventsController = require('./controllers/eventsControls')
// const itemsController = require('./controllers/itemsControls')
// const sellersController = require('./controllers/sellerControls')

// 2. Add the code needed to make body-parser work within your app.
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())


app.use('/event/', eventsController)
// app.use('/item/', itemsController)
// app.use('/seller/', sellersController)

app.listen(8080, () => console.log('Server running on port 8080!'))
