const mongoose = require("./connections");

const eventSchema= require("../models/Events");
const itemSchema = require("../models/Items");
const sellerSchema = require("../models/Sellers")

// clear the database of records using event and item models
eventSchema.deleteMany({}).then(() => {
  console.log("deleted all events")
  itemSchema.deleteMany({}).then(() => {
    console.log("deleted all Items")

        // clear the database of records using seller model
        sellerSchema.deleteMany({}).then(() => {
            console.log("deleted all sellers")

 // create an event
 eventSchema.create({
    eDescription: "Keith Garage Sale",
    date: Date("2020-04-15T09:00:00Z"),
    location: "3000 SE Broadway St., Atlanta, GA",
    seller: ""
    })
    .then(e => {e
 // create an item
    itemSchema.create({
        item: "Bike",
        iDescription: "BMongoose Dolomite Men's Fat Tire Bike, 26-inch wheels, 7 speeds, Black",
        cost: 50,
        image: "http://clipart-library.com/data_images/42693.jpg",
        sold: false,
    }).then(it => {
        e.items.push(it.id);
        console.log("created Bike item");
    });

// create second item
    itemSchema.create({
        item: "Desk",
        iDescription: "Solid Wood Executive Desk",
        cost: 80,
        image: "http://clipart-library.com/data_images/148464.png",
        sold: false
    }).then((it) => {
        e.items.push(it.id);
        e.save();
        console.log("created Desk item");

    });

        // create a seller

        // console.log('e.id', e.id)
        // sellerSchema.create({
        //     name: "John Last",
        //     event: e.id
        // }).then((sell) => {
        //     console.log('e.id', e.id)
        //     console.log('sell.id', sell.id)
        //     e.event = sell.id;
        //     e.save();
        //     console.log("created seller John Last")
        // })
    })
    .catch(error => console.log(error))
    })
  })
})