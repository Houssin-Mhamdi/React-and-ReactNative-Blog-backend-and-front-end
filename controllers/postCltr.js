const CarPost = require('../model/posteModel.js')
module.exports.createCarPostCrtl = async (req, res) => {
    const carPost = await CarPost.create({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        mileage: req.body.mileage,
        price: req.body.price,
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        category: req.body.category,
        discription: req.body.discription,
        user: req.user.id,

    })
    res.status(201).json(carPost)
}

//5.send response to the client