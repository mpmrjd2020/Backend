const express = require("express")
const router = express.Router()

const eventSchema = require("../models/Event");
const itemSchema = require("../models/Item");
const sellerSchema = require("../models/Seller")

router.get('/',(req, res) => {
    eventSchema.find({}).then(event => res.json(event))
})

router.get('/event/:eventId',(req, res) => {
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
        newSeller.event.push(newEvent._id);
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
//     console.log(req.body.seller)

//     let newSeller = {}
//     let newEvent = {}

//     function populateSeller() {
//     sellerSchema.create(req.body.seller)
//         .then(seller => {
//             newSeller = seller
//             console.log('newSeller', newSeller)
//         })
//     }

//     async function populateEvent() {
//     await populateSeller()
//     eventSchema.create(req.body.events)
//         .then(event => {
//             event.seller.push(newSeller._id)
//             event.save()
//             console.log('event', event)
//             .then(savedEvent => {
//                 console.log(savedEvent)
//                 newEvent = savedEvent       
//         })

//     // .catch(error => res.json(error))
//     })}
    
//     populateEvent()

// })

router.put('/:eventId/new-item',(req, res) => {
    console.log(req)
    console.log('req params', req.params.eventId)

    const eventID = req.params.eventId
    let newItem = {}

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


router.post('/sellers',(req, res) => {
    let newSeller = req.body
    sellerSchema.create(newSeller)
    .then(seller => res.json(seller))
})


module.exports = router