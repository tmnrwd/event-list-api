const express = require('express')      //alternative to using import...
const app = express()
const port = process.env.PORT || 3000
const router = require('./router')

app.use(express.json());
app.use(router)
//app.get('/test', (req, res) => res.send('Hello test!'))
//app.get('/', (req, res) => res.send('Hello express!'))
//response.send - just sending a string

app.listen(port, () => 
console.log(`Example app listening at http://localhost:${port}`))
//listening to the port for the thing we sent (I think)