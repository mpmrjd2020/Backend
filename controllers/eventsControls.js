const express = require("express")
const router = express.Router()

const eventSchema= require("../models/Event");
const itemSchema = require("../models/Item");
const sellerSchema = require("../models/Seller")

router.get('/',(req, res) => {
    eventSchema.find({}).then(event => res.json(event))
})

router.get('/:eventId',(req, res) => {
    console.log(req.params)
    eventSchema.findOne({_id: req.params.eventId})
    .then(
        event => (
            res.json(event)
            // event.items.map(singleE =>
            //     itemSchema.findById(singleE)
            //      .then(item => res.json(item))    )
            // )
            ))
})

router.post('/new-event',(req, res) => {
    console.log(req)
    console.log(req.body.seller)

    let newSeller = {}
    let newEvent = {}

    function populateSeller() {
    sellerSchema.create(
        req.body.seller
    ).then(seller => {
        newSeller = seller
        console.log('newSeller', newSeller)
    })
    }
    
    async function populateEvent() {
    await populateSeller()
    eventSchema.create(
        req.body.events
    ).then(event => {
        event.seller.push(newSeller._id)
        event.save()
            console.log('event', event)
            .then(savedEvent => {
                console.log(savedEvent)
                newEvent = savedEvent
            
        })
    
    
    eventSchema.create(req.body.events)
        .then(newEvent => {
        sellerSchema.create(req.body.seller)
            .then(newSeller => {
           
            newSeller.event.push(newEvent._id)
            newEvent.seller.push(newSeller._id)
            newSeller.save()
            newEvent.save()
             
            res.json(newEvent)
            res.json(newSeller)
        })
        
    })

    populateEvent()
    // .catch(error => res.json(error))
})

router.put('/:eventId/new-item',(req, res) => {
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

router.delete('/:eventDeleteID', (req, res) => {
    eventSchema.findByIdAndDelete(req.params.eventDeleteID).then
    (eventD => res.json(eventD))
})
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