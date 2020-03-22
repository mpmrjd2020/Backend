const express = require("express")
const router = express.Router()

const eventSchema= require("../models/Events");
const itemSchema = require("../models/Items");
const sellerSchema = require("../models/Sellers")

router.get('/',(req, res) => {
    eventSchema.find({}).then(event => res.json(event))
})

router.get('/',(req, res) => {
    itemSchema.find({}).then(item => res.json(item))
})

module.exports = router