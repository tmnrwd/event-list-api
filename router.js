const express = require('express');
const router = express.Router();
const events = require ('./eventController') //importing eventController as events


/* GET home page. */
router.get('/eventlist', events.index) //triggers events.index from controller
router.get('/eventlist/:id', events.show)
router.post('/eventlist/create', events.create)
router.delete('/eventlist/:id', events.delete)
router.put('/eventlist/:id', events.update) //updating

module.exports = router; //exporting as module. can't use export default etc. b/c we're not using ES6 or classes