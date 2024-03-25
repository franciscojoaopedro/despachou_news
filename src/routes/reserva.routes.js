const express = require('express');
const { solicitarAluguel,cancelarReserva } = require('../controllers/reserva/reserva.controller');
const reserva_router = express.Router();

reserva_router.post("/create",solicitarAluguel)
reserva_router.get("/cancel/:reservaId",cancelarReserva)

module.exports=reserva_router