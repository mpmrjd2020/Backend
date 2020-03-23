const mongoose = require('../db/connections')

const EventsSchema = new mongoose.Schema({
    eDescription: String,
    date: {type: Date, default: Date.now},
    location: String,
    items: [
        {
            ref: "Items",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    // seller: {
    //         ref: "Sellers"
    //         type: mongoose.Schema.Types.ObjectId,
    //     }
})

const Events = mongoose.model("Events", EventsSchema)

module.exports = Events