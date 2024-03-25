const mongoose = require('mongoose');
const notificacaoSchema = require('./schema/schema.notificacao');
const Notificacao=mongoose.model('Notificacao', notificacaoSchema);
module.exports = Notificacao