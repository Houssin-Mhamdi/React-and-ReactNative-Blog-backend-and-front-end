const express = require('express')
require('dotenv').config()
const postRoute = require('./routes/post.js')    
const app = express()

app.use('/api/post',postRoute)


const PORT = process.env.PORT || 4848

app.listen(PORT,()=>{
    console.log(`app listining in PORT ${PORT}`)
})