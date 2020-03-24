const express = require("express")
const router = express.Router()

const eventSchema= require("../models/Event");
const itemSchema = require("../models/Item");
const sellerSchema = require("../models/Seller")

router.get('/',(req, res) => {
    itemSchema.find({}).then(item => res.json(item))
})

router.put('/:eventId',(req, res) => {
    console.log(req)
    console.log('req params', req.params.eventId)

    const eventID = req.params.eventId
    let newItem = {}
    let updatedEvent = {}

    function populateItem() {
    itemSchema.create(
        req.body
    ).then(item => {
        newItem = item
        console.log('newSeller', newItem)
        res.json(newItem)
    })
    }
    
    async function updateEvent() {
    await populateItem()
    eventSchema.findOne({_id: eventID}).then(updatedEvent => {
        updatedEvent.items.push(newItem._id)
        updatedEvent.save()
            console.log('event', updatedEvent)
            // res.json(updatedEvent)
        //     .then(savedEvent => {
        //         console.log(savedEvent)
        //         newEvent = savedEvent
            
        // })
    
    
    // eventSchema.create(req.body.event)
    //     .then(newEvent => {
    //     sellerSchema.create(req.body.seller)
    //         .then(newSeller => {
    //         newSeller.save()})
    //     .then
    //         newEvent.seller = newSeller._id

    //         newEvent.save()
             
    //         res.json(newEvent)
    //         res.json(newSeller)
    //     })
    })}

    updateEvent()
    // .catch(error => res.json(error))
})

module.exports = router