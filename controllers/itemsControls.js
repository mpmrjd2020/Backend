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
    
    })}

    updateEvent()

})

router.put('/cost/:itemId',(req, res) => {
    const eventID = req.params.itemId
    console.log(req)
    itemSchema.findOne({_id: req.params.itemId}).then(itemCostUpdate => {
        itemCostUpdate.cost = req.body.cost
        res.json(itemCostUpdate)
    })
})

router.delete('/sold/:eventId/:itemId',(req, res) => {
    const eventID = req.params.itemId
    console.log(req)
    itemSchema.findOneAndDelete({_id: req.params.itemId}).then(itemDelete => {
        res.json(itemDelete)
    })

    eventSchema.findOne({_id: req.params.eventId}).then((eventRemoveItemRef, i, arr) => {
        eventRemoveItemRef.items.splice(i,1)   
        eventRemoveItemRef.save() 
        console.log(eventRemoveItemRef)
    })
})

router.put('/:itemId')

module.exports = router