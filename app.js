const express = require('express')
require('dotenv').config()    
const app = express()


const PORT = process.env.PORT || 4848

app.listen(PORT,()=>{
    console.log(`app listining in PORT ${PORT}`)
})