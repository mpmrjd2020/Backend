const mongoose = require('../db/connections')

const SellersSchema = new mongoose.Schema({
    name: String,
    event: [
        {
            ref: "Event",
            type: mongoose.Schema.Types.ObjectId
        } ]
})

const Seller = mongoose.model("Seller", SellersSchema);

module.exports = Seller