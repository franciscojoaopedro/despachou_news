//import {v2 as cloudinary} from 'cloudinary';
const cloudinary=require("cloudinary").v2
require("dotenv").config()
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_APY_KEY, 
  api_secret:process.env.CLOUDINARY_APY_SECRET,
});

module.exports=cloudinary;

