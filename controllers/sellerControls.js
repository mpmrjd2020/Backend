const express = require("express")
const router = express.Router()

const eventSchema= require("../models/Event");
const itemSchema = require("../models/Item");
const sellerSchema = require("../models/Seller")

router.post('/sellers',(req, res) => {
    let newSellers = req.body
    sellerSchema
    .create(newSellers)
    .then(seller => res.json(seller))
})

router.post('/newEvent', (req,res) => {
    console.log(req.body)

    eventSchema.create(req.body.event).then(newEvent => {
        sellerSchema.create(req.body.cookbook).then(newSeller => {
            newEvent.seller = `${newSeller._id}`
            newSeller.event.push(newEvent._id)
    
            newEvent.save()
            newSeller.save()
    
            res.json(newSeller, newEvent)
    
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router