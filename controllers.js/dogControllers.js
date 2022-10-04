////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Dog = require("../models/dog")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////


// GET request
// index route -> shows all instances of a document in the db
router.get("/", (req, res) => {
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Dog.find({})
        .then(dogs => {
            // this the preferred method for APIs
            res.json({ dogs: dogs })
        })
        .catch(err => console.log(err))
})

// POST request
// create route -> gives the ability to create new dogs
router.post("/", (req, res) => {
    // here, we'll get something called a request body
    // inside this function, that will be referred to as req.body
    // we'll use the mongoose model method `create` to make a new dog
    Dog.create(req.body)
        .then(dog => {
            res.status(201).json({ dog: dog.toObject() })
        })
        .catch(error => console.log(error))
})

// PUT request
// update route -> updates a specific dog
router.put("/:id", (req, res) => {
    // console.log("I hit the update route", req.params.id)
    const id = req.params.id
    
    // for now, we'll use a simple mongoose model method, eventually we'll update this(and all) routes and we'll use a different method
    // we're using findByIdAndUpdate, which needs three arguments
    // it needs an id, it needs the req.body, and whether the info is new
    Dog.findByIdAndUpdate(id, req.body, { new: true })
        .then(dog => {
            console.log('the dog from update', dog)
            // update success is called '204 - no content'
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request
// destroy route -> finds and deletes a single resource(fruit)
router.delete("/:id", (req, res) => {
    // grab the id from the request
    const id = req.params.id
    // find and delete the dog
    Dog.findByIdAndRemove(id)
        // send a 204 if successful
        .then(() => {
            res.sendStatus(204)
        })
        // send the error if not
        .catch(err => res.json(err))
})

// SHOW request
// read route -> finds and displays a single resource
router.get("/:id", (req, res) => {
    const id = req.params.id

    Dog.findById(id)
        .then(dog => {
            res.json({ dog: dog })
        })
        .catch(err => console.log(err))
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router