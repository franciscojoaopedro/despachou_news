const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
  usuarioID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Substitua 'User' pelo nome do seu schema de usuário, se for diferente
    required: true,
  },
  imovelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imovel', // Substitua 'Property' pelo nome do seu schema de imóvel, se for diferente
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
},);


module.exports = favoriteSchema;