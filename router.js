const express = require('express');
const router = express.Router();
const todos = require ('./todosController') //importing todosController as todos

/* GET home page. */
router.get('/todo', todos.index) //triggers todos.index from controller
router.get('/todo/:id', todos.show)
router.post('/todo/create', todos.create)
router.delete('/todo/:id', todos.delete)
router.put('todo/:id', todos.update) //updating

module.exports = router; //exporting as module. can't use export default etc. b/c we're not using ES6 or classes