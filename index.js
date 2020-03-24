const express = require('express')
// 1. Require body-parser and save it to the variable parser.
const parser = require('body-parser')

const cors = require('cors')
const app = express()

const eventsController = require('./controllers/eventsControls')
// const itemsController = require('./controllers/itemsControls')
// const sellersController = require('./controllers/sellerControls')

app.use(cors())
app.use(express.json())
// 2. Add the code needed to make body-parser work within your app.
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())

app.get('/', (req, res) => {
    res.redirect('/event/');
  });


app.use('/event/', eventsController)
// app.use('/item/', itemsController)
// app.use('/seller/', sellersController)

app.listen(8080, () => console.log('Server running on port 8080!'))
