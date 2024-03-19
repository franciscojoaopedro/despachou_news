const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/model.usuario');

const login = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).send({ error: 'Usuário não encontrado!' });
    }
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
  
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Senha inválida!' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).send({ token });
  };
  