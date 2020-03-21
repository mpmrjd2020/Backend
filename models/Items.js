const mongoose = require('../db/connections')

const itemsSchema = new mongoose({
    item: String,
    iDescription: String,
    cost: Number,
    image: String,
    sold: Boolean
})

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items