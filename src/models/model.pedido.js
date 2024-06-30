const {model,Schema}= require("mongoose");
const pedidoSchema = require("./schema/schema.pedido");
const Pedido = model('Pedido', pedidoSchema);

module.exports=Pedido