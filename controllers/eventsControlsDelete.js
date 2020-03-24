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
        )
    )
})

router.post("/new-event", (req, res) => {
    eventSchema.create(req.body.events).then(newEvent => {
      sellerSchema.create(req.body.seller).then(newSeller => {
        console.log(newSeller._id)
        console.log(newEvent._id)
        // push new bookmark id into user.favorites array
        newEvent.seller.push(newSeller._id);
        // push new user id into bookmark.favorited array
        newSeller.events.push(newEvent._id);
        // save both or they wont persist
        newEvent.save();
        newSeller.save();
        // send entire document back
        res.json(newEvent);
      });
    });
  });
// router.post('/new-event',(req, res) => {
//     console.log(req)
//     console.log(req.body.events)

      
//     eventSchema.create(req.body.events)
//         .then(newEvent => {
//         sellerSchema.create(req.body.seller)
//             .then(newSeller => {
           
//             newSeller.event.push(newEvent._id)
//             newEvent.seller.push(newSeller._id)
//             newSeller.save()
//             newEvent.save()
             
//             res.json(newEvent)
//             res.json(newSeller)
//             .catch(error => res.json(error) )

  
// })

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
        })    
    }

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


module.exports = router

  

