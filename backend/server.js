require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT||3000
const mongoose = require('mongoose')
const MONGO_DB_USER = process.env.MONGO_DB_USER
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const path = require('path')

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://ds163014.mlab.com:63014/media-manager' ,{auth: {
    user: MONGO_DB_USER,
    password: MONGO_DB_PASSWORD
  },useNewUrlParser: true})

require('./models/User')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views') )
app.use(require('./routes'))
app.use('/shopify', express.static('./public'))
app.listen(PORT, () => {
    console.log('App is running on port 3000...');
})