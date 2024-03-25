const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  imovelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imovel',
    required: true
  },
  usuarioID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  dataInicio: {
    type: Date,
    required: true
  },
  dataFim: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['ativa', 'cancelada'],
    default: 'ativa'
  }
}, { timestamps: true });

module.exports = reservaSchema