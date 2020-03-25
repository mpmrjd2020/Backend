const express = require("express")
const router = express.Router()

const eventSchema = require("../models/Event");
const itemSchema = require("../models/Item");
const sellerSchema = require("../models/Seller")

router.get('/',(req, res) => {
    eventSchema.find({})
    .populate('items')
    .populate('seller')
    .then(event => res.json(event))
})


router.get('/event/:eventId',(req, res) => {
    // eventSchema.find({}).then(event => res.json(event))
    let itemIdArr = []
    let eventSellerItem = {}
    eventSchema.findOne({_id: req.params.eventId})
        .then(event => {
            if (event.items.length !== 0) {
                event.items.map(ev => (
                    console.log('ev',ev),
                    itemIdArr.push(ev),
                    itemSchema.findById(ev)
                            .then(item => {
                                console.log(event),
                                console.log(item),
                                event = ({event, item})
                                // eventSellerItem = ({event, item})
                                // res.json(eventSellerItem)
                            })
                    )
                )  
            } else {
                eventSellerItem = {event}
                // res.json(eventSellerItem )
            }
            if (event.seller.length !== 0) {
                event.seller.map(ev => (
                    console.log('ev',ev),
                    sellerSchema.findById(ev)
                            .then(seller => {
                                console.log(event),
                                console.log(seller),
                                event = ({event, seller})
                                res.json(event)
                            })
                    )
                )  
            } else {
                // eventSellerItem = {event}
                res.json(eventSellerItem )
            }
                // .error(error => console.log(error))        
    
        }
        )    

})


// router.get('/event/:eventId',(req, res) => {
//     console.log(req.params)
//     eventSchema.findOne({_id: req.params.eventId})
//     .then(
//         event => (
//             res.json(event)
//             // event.items.map(singleE =>
//             //     itemSchema.findById(singleE)
//             //      .then(item => res.json(item))    )
//             // )
//         )
//     )
// })

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


router.delete('/event/:eventDeleteID', (req, res) => {
    eventSchema.findByIdAndDelete(req.params.eventDeleteID).then
    (eventD => res.json(eventD))
})


router.post('/sellers',(req, res) => {
    let newSeller = req.body
    sellerSchema.create(newSeller)
    .then(seller => res.json(seller))
})


module.exports = router