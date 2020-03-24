const mongoose = require('../db/connections')

const itemsSchema = new mongoose.Schema({
    item: String,
    iDescription: String,
    cost: Number,
    image: String,
    sold: Boolean
})

const Item = mongoose.model("Item", itemsSchema);

module.exports = Item