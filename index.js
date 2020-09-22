const express = require('express')      //alternative to using import...
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors');
const { restart } = require('nodemon')
const { User } = require('./models/user');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(router);

/*
app.use(async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const user = await User.findOne({token: authHeader})
    if (user) {
      next()
    } else { res.sendStatus(403) }
  })
  */

app.post('/auth', async (req, res) => {
    console.log("triggered authenticate. username:", req.body.username, "password:", req.body.password)
    const userSearch = await User.findOne({username: req.body.username})
    if (!userSearch) {
        return res.sendStatus(401)
    }
    if (req.body.password != userSearch.password){
        console.log("Password wrong")
        return res.sendStatus(403)
    }
    userSearch.token = uuidv4()
    await userSearch.save()
    res.send({token: userSearch.token})
})


app.listen(port, () => 
console.log(`Example app listening at http://localhost:${port}`))
//listening to the port for the thing we sent (I think)
mongoose.connect('mongodb://localhost/eventlist')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Database connected")
});