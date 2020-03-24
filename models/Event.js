const mongoose = require('../db/connections')

const EventsSchema = new mongoose.Schema({
    eDescription: String,
    date: {type: Date, default: Date.now},
    location: String,
    items: [
        {
            ref: "Item",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
    ,
    seller: [
        {
            ref: "Seller",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

const Event = mongoose.model("Event", EventsSchema)

module.exports = Event