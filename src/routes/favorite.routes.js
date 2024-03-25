const express = require('express');
const favorite_router = express.Router();
const { addFavorite ,deleteFavorite,listFavoritesByUser} = require('../controllers/favorites/favorite.controller');

// Rota para adicionar um favorito
favorite_router.post('/add', addFavorite);

// Rota para listar todos os favoritos de um usuário
favorite_router.get('/user/:usuarioID', listFavoritesByUser);

// Rota para deletar um favorito
favorite_router.delete('/destroy/:id',deleteFavorite);

module.exports = favorite_router;