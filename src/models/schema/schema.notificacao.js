const mongoose = require('mongoose');

const notificacaoSchema = new mongoose.Schema({
  destinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  mensagem: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['solicitacaoAluguel', 'mensagem', 'outro'],
    required: true
  },
  dadosAssociados: mongoose.Schema.Types.Mixed,
  lida: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
module.exports=notificacaoSchema