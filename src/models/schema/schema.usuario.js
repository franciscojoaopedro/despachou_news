const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefone: {
    type: String,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['proprietario',"corrector",'inquilino'] ,
    default: "corrector",
  },
  avatar: {
    type:String,
  },
  online: {
    type: Boolean,
    default: false,
  },
  socketId: {
    type: String,
  },
},{timestamps:true});




module.exports = usuarioSchema;