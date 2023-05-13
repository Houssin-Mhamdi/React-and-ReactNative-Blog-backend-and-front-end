const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//upload Images

const cloudinaryUploadImages = async (fileToUplode) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUplode, { resource_type: 'auto' });
    return data
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (cloudinary)")
  }
}
module.exports = { cloudinaryUploadImages }