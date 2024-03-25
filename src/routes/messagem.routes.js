const express = require('express');
const { enviarMensagem,receberMensagens } = require('../controllers/messagem/message.controller');
const messagem_router = express.Router();


messagem_router.post("/enviar",enviarMensagem)
messagem_router.get("/receber/:usuarioId",receberMensagens)

module.exports=messagem_router




