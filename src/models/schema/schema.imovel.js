const mongoose = require('mongoose');

const ImovelSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  referencia: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  bairro: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  quartos: {
    type: Number,
    required: true,
  },
  banheiros: {
    type: Number,
    required: true,
  },
  vagasGaragem: {
    type: String,
    enum:["sim","não"],
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  fotos: {
    type: [String],
  },
  proprietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});


module.exports = ImovelSchema;