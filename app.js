const express = require('express')
require('dotenv').config()
const conectToDb = require('./config/conectToDb.js')
const postRoute = require('./routes/post.js')
const morgan = require('morgan')
conectToDb()

const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/post', postRoute)


app.use((err, req, res, next) => {
    res.status (500).json({ error: err.message });
    });

const PORT = process.env.PORT || 4848

app.listen(PORT, () => {
    console.log(`app listining in PORT ${PORT}`)
})