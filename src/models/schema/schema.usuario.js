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
  senha: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['proprietario',"corrector",'inquilino'],
  },
  avatar: {
    type:String,
  },
});

usuarioSchema.pre('save', async function (next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});


module.exports = usuarioSchema;