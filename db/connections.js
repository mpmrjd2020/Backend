const mongoose = require('mongoose')

mongoose.Promise = Promise

const mongoURI = 'mongodb://localhost/eSaleDB'

mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(instance => console.log(`Connected to db: ${instance.connections[0].name}`))
    .catch(error => console.log('Connection failed!', error))

module.exports = mongoose