const createError = require('http-errors')

let todolist = []
let idno = 0

exports.index = function (req, res) {
    res.send(todolist)
}

exports.create = function (req,res, next) {   //create operation
    if(!req.body.name) {
        return(next(createError(400, "name is required")))
        //if there's no body, run createError and present a 400 error with this string
    }
    todolist.push({id: idno, name: req.body.name})             //assigns an ID, and turns body into the name
    res.send({result: true})            //client knows something has happened
    idno++
}

exports.show = function (req, res, next) {
    const todoitem = todolist.find((todo) => todo.id == req.params.id)  //search for the todo with that id and assign to constant
    if(!todoitem) {
        return(next(createError(404, "no todo with that id")))          //display error if no such todo exists
    }
    res.send(todoitem)                                                  //send the assigned todo
}

exports.delete = function (req, res, next) {
    const todoitem = todolist.find((todo) => todo.id == req.params.id)  //search for the todo with that id and assign to constant
    if(!todoitem) {
        return(next(createError(404, "no todo with that id")))          //display error if no such todo exists
    }
    todolist = todolist.filter((todo) => todo.id != req.params.id)      //filter that todo from the list
    res.send({result: true})                                            //send resulting list
}

exports.update = function (req, res, next) {
    const todoitem = todolist.find((todo) => todo.id == req.params.id)  //search for the todo with that id and assign to constant
    if(!req.body.name) {
        return(next(createError(400, "name is required")))
        //if there's no body, run createError and present a 400 error with this string
    }
    if(!todoitem) {
        return(next(createError(404, "no todo with that id")))          //display error if no such todo exists
    }
    todolist = todolist.map((todo) => {                                 //map through list
        if (todo.id == req.params.id) {                                 //if ID matches, 
            todo.name = req.body.name                                   //change body to the body in request
        }
    return todo                                                         //return resulting list
    })
    res.send({result:true})                                             //need this always so there's no unfilled promise from the front end
                                                                        //you can make the response more detailed but usually just sending true is fine.
}
