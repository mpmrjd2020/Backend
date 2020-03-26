const mongoose = require("./connections");

const eventSchema= require("../models/Event");
const itemSchema = require("../models/Item");
const sellerSchema = require("../models/Seller")

// clear the database of records using event and item models
eventSchema.deleteMany({})
    .then(() => {
        console.log("deleted all events")
        itemSchema.deleteMany({}).then(() => {
    console.log("deleted all Items")

        // clear the database of records using seller model
sellerSchema.deleteMany({}).then(() => {
    console.log("deleted all sellers")
})
  })
})

 // create an event

 let newSeller = {}
 let newItem = {}
 let newItem1 = {}
 let newEvent = {}

 // create items
function populateItem() { 
    itemSchema.create({
        item: "Bike",
        iDescription: "BMongoose Dolomite Men's Fat Tire Bike, 26-inch wheels, 7 speeds, Black",
        cost: 50,
        image: "http://clipart-library.com/data_images/42693.jpg",
        sold: false,
    }).then(item => {
        newItem = item
    
        console.log("created Bike item");
    });


    itemSchema.create({
        item: "Desk",
        iDescription: "Solid Wood Executive Desk",
        cost: 50,
        image: "http://clipart-library.com/data_images/148464.png",
        sold: false,
    }).then(item => {
        newItem1 = item
    
        console.log("created Bike item");
    });
}

//Create seller
function populateSeller() {
sellerSchema.create({
    name: "John Last",
}).then(seller => {
    newSeller = seller
 
})
}

//Create event with associated references
async function populateEvent() {
    await populateItem()
    await populateSeller()
    eventSchema.create({
        eDescription: "Keith Garage Sale",
        date: Date("2020-04-15T09:00:00Z"),
        location: "3000 SE Broadway St., Atlanta, GA"
    })
    .then(event => {
        event.seller = newSeller._id
        event.items.push(newItem._id)
        event.items.push(newItem1._id)
        event.save()
            .then(savedEvent => {
                console.log(savedEvent)
                newEvent = savedEvent
            
        })
})}

populateEvent() 

