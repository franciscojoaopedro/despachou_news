const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
  usuarioID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true,
  },
  imovelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imovel', 
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});


module.exports = favoriteSchema;