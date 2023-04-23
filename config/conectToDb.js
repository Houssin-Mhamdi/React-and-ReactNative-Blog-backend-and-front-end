const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to Mongodb');
    } catch (error) {
        console.log('Connection failed to mongodb!', error);
    }
}