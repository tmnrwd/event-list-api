const createError = require('http-errors');
const { ObjectId } = require('mongodb');
const {Event} = require("./models/events")

var MongoClient = require('mongodb').MongoClient;

const dbPromise = MongoClient.connect('mongodb+srv://bob:turnip@cluster0.etoi5.mongodb.net/<eventlist>?retryWrites=true&w=majority').then((client) => client.db('events'))
const listPromise = dbPromise.then((db) => db.collection('list'))


exports.index = function (req, res) {
Event.find()            
    .then(events =>
      res.send(events))
  }

exports.create = function (req, res, next) {   //create operation
    if(!req.body.name) {
        return(next(createError(400, "name is required")))
        //if there's no body, run createError and present a 400 error with this string
    }
    const event = new Event({ name: req.body.name, location: req.body.location, precis: req.body.precis, date: req.body.date, time: req.body.time })
    event.save()
    .then(() => res.send({ result: true })
    )
}

exports.show = function (req, res, next) {
    Event.findOne({ _id: ObjectId(req.params.id)})
    .then((event) => {
        console.log(event)
        if(!event) {
            return(next(createError(404, "no event with that id")))          //display error if no such todo exists
        }
        res.send(event)                                                  //send the assigned todo
    })
};

exports.update = function (req, res, next) {
    Event.findOne({ _id: ObjectId(req.params.id)})
    .then((event) => {
        if(!event) {
            return(next(createError(404, "no event with that id")))          //display error if no such todo exists
        }
        if (req.body.name){event.name = req.body.name};
        if (req.body.location){event.location = req.body.location};
        if (req.body.precis){event.precis = req.body.precis};
        if (req.body.date){event.date = req.body.date};
        if (req.body.time){event.time = req.body.time};
        event.save().then(() => res.send({ result: true }))
    })
};


/*
//here is a different variety of update function:
exports.update = async function (req, res, next) {

    if (!req.body.name) {
        return (next(createError(400, "name is required")))
    }

    try {
        const r = await (await listPromise).updateOne({ _id: ObjectId(req.params.id) },{ $set: { name: req.body.name, location: req.body.location, precis: req.body.location, date: req.body.date, time: req.body.time }})

        if (r.matchedCount) {
            return res.send({ result: true})
        }
        return (next(createError(404, "no event with that id")))    
    } catch (e) {
        next(e)
    }
}
*/

exports.delete = function (req, res, next) {
    Event.deleteOne({ _id: ObjectId(req.params.id) })
    .then((r) => {
        if (r.deletedCount) {
            return res.send({ result: true })
        }
        return (next(createError(404, "no event with that id")))
    })    
}