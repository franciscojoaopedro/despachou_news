const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  imovelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imovel',
    required: true
  },
  compradorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  estadoDoPedido:{
    type:Boolean,
    enum:[false,true],
    default:false
  }
 
}, { timestamps: true });

module.exports = pedidoSchema