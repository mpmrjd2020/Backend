const express = require("express")
const router = express.Router()

const eventSchema= require("../models/Event");
const itemSchema = require("../models/Item");
const sellerSchema = require("../models/Seller")

router.get('/',(req, res) => {
    eventSchema.find({}).then(event => res.json(event))
})

// router.get('/:eventId',(req, res) => {
//     console.log(req.params)
//     eventSchema.findOne({_id: req.params.eventId})
//     .then(
//         event => (
//             res.json(event)
//             // event.items.map(singleE =>
//             //     itemSchema.findById(singleE)
//             //      .then(item => res.json(item))    )
//             // )
//             ))
// })

router.post('/newEvent/Update',(req, res) => {
    eventSchema
    .create(req.body)
    .then(event => res.json(event))
})

// router.get('/:eventId/items',(req, res) => {
//     eventSchema.find({_id: req.params.eventId})
//         .then(
//             (event) => res.json(event),
//             itemSchema.find(`/${req.params.items}}`) 
//             .then(item => res.json(item)
//             )
//         )
// })

router.post('/sellers',(req, res) => {
    let newSeller = req.body
    sellerSchema.create(newSeller)
    .then(seller => res.json(seller))
})

// router.post('/newEvent', (req,res) => {
//     console.log(req.body)

//     eventSchema.create(req.body.event).then(newEvent => {
//         sellerSchema.create(req.body.seller.then(newSeller => {
//             newEvent.seller = `${newSeller._id}`
//             newSeller.event.push(newEvent._id)
    
//             newEvent.save()
//             newSeller.save()
    
//             res.json(newSeller, newEvent)
    
//         })
//         .catch(error => console.log(error))
//     })
//     .catch(error => console.log(error))
// })

module.exports = router