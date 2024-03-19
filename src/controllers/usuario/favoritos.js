const Usuario = require('../models/Usuario');

const getFavorites = async (req, res) => {
  const usuario = await Usuario.findById(req.userId).populate('favoritos')
}