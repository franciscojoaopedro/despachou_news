const mongoose=require("mongoose");
const favoriteSchema = require("./schema/schema.favorite");


const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports=Favorite