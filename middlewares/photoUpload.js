const path = require("path");
const multer = require("multer");

// Photo Storage
const storage = multer.diskStorage({

})
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.includes("image")) {
        return cb("Invalid image format!", false)
    }
    cb(null, true)

}


const photoUpload = multer({ storage, fileFilter })

module.exports = photoUpload;