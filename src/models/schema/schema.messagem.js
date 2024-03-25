const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({
  remetente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  destinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  conteudo: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mensagemSchema