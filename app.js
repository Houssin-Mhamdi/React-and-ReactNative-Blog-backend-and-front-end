const express = require('express')
require('dotenv').config()
const conectToDb = require('./config/conectToDb.js')
const postRoute = require('./routes/post.js')
const app = express()

conectToDb()

app.use('/api/post', postRoute)


const PORT = process.env.PORT || 4848

app.listen(PORT, () => {
    console.log(`app listining in PORT ${PORT}`)
})