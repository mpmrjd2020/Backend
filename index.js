const express = require('express')
// 1. Require body-parser and save it to the variable parser.
const parser = require('body-parser')

const app = express()

const eSaleController = require('./controllers/eSaleControls')

// 2. Add the code needed to make body-parser work within your app.
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())


app.use('/event/', eSaleController)


app.listen(8080, () => console.log('Server running on port 8080!'))
