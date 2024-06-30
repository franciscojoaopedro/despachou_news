const mongoose = require('mongoose');

const ImovelSchema = new mongoose.Schema({
  tipo: {
    type: String,
  },
  titulo: {
    type: String,
    
  },
  descricao: {
    type: String,
   
  },
  endereco: {
    type: String,
    
  },
  valor: {
    type: Number,
    
  },
  fotos: {
    type: [String],
  },
  proprietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  status: {
    type: String,
    enum: ['DISPONIVEL', 'VENDIDO','ARRENDADO'],
    default: 'DISPONIVEL'
  },
  estadoDoImovel:{
    type:String,
    enum:["VENDA","ARRENDAMENTO"]
  }
},{timestamps:true});


module.exports = ImovelSchema;