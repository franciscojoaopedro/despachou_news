const mongoose = require('mongoose');
const mensagemSchema = require("./schema/schema.messagem");

const Mensagem=mongoose.model('Mensagem', mensagemSchema);

module.exports=Mensagem