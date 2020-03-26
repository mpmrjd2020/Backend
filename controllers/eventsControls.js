const express = require("express")
const router = express.Router()

const eventSchema = require("../models/Event");
const itemSchema = require("../models/Item");
const sellerSchema = require("../models/Seller")


//Get all events and related items and the seller
router.get('/',(req, res) => {
    eventSchema.find({})
    .populate('items')
    .populate('seller')
    .then(event => res.json(event))
})

//Add a new ebent with the seller attached to that event
router.post("/new-event", (req, res) => {
    eventSchema.create(req.body.events).then(newEvent => {
      sellerSchema.create(req.body.seller).then(newSeller => {
        console.log(newSeller._id)
        console.log(newEvent._id)

        newEvent.seller.push(newSeller._id);

        newSeller.event.push(newEvent._id);

        newEvent.save();
        newSeller.save();

        res.json(newEvent);
      });
    });
  });

//Add a new item and attached it to the event
router.put('/new-item',(req, res) => {
    console.log(req)
    console.log('req params', req.params.eventId)

    const eventID = req.body.event._id
    // const eventID = req.params.eventId
    let newItem = {}

        function populateItem() {
        itemSchema.create(
            req.body.item
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
        })    
    }

    updateEvent()

})

//Delete an event
router.delete('/event/:eventDeleteID', (req, res) => {
    eventSchema.findByIdAndDelete(req.params.eventDeleteID).then
    (eventD => res.json(eventD))
})

//Delete an item and remove it from the schema
router.delete('/delete-item/:eventId/:itemId',(req, res) => {
    const eventID = req.params.itemId
    itemSchema.findOneAndDelete({_id: req.params.itemId}).then(itemDelete => {
        res.json(itemDelete)
    })

    eventSchema.findOne({_id: req.params.eventId}).then((eventRemoveItemRef, i, arr) => {
        var n = eventRemoveItemRef.indexOf(eventID)
        eventRemoveItemRef.items.splice(n,1)   
        eventRemoveItemRef.save() 
        console.log(eventRemoveItemRef)
    })
})

//Update an item 
router.put('/update-item/:itemId',(req, res) => {
    const eventID = req.params.itemId
    itemSchema.findOneAndUpdate({_id: req.params.itemId},req.body,{new:true})
        .then(itemCostUpdate => {
        res.json(itemCostUpdate)
    })
})


module.exports = router