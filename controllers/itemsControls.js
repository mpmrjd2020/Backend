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