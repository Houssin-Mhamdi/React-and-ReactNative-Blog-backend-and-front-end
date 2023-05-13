const path = require("path");
const multer = require("multer");

// Photo Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'))
    },
    filename: function (req, file, cb) {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        } else {
            cb(null, false)
        }
    }
})

//photo Upload Middleware
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.includes("image")) {
        return cb("Invalid image format!", false)
    }
    cb(null, true)

}


const photoUpload = multer({ storage, fileFilter })

module.exports = photoUpload;