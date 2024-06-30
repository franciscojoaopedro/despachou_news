const express = require('express');
const pedido_router = express.Router();
const { criarPedido,
    aceitarPedido,
    mostrarPedidosCompradorImovel,
    mostrarPedidosProprietarioImovel
} = require('../controllers/pedidos/pedido.controllers');


pedido_router.post('/criar/user/:compradorID/imovel/:imovelID',criarPedido);
pedido_router.put('/aceitar/:idPedido',aceitarPedido);
pedido_router.get('/listar/comprador/:idUsuario',mostrarPedidosCompradorImovel);
pedido_router.get('/listar/propreitario/:idUsuario',mostrarPedidosProprietarioImovel);



module.exports = pedido_router;