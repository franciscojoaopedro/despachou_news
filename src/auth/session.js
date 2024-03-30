const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Garantir que bcrypt está sendo importado
const { Usuario } = require('../models/model.usuario');

const login = async (req, res) => {
    const { email, senha } = req.body;

    // Validação básica de entrada
    if (!email || !senha) {
        return res.status(400).send({ error: 'Email e senha são obrigatórios!' });
    }

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).send({ error: 'Usuário não encontrado!' });
        }

        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Senha inválida!' });
        }

        const token = jwt.sign({ id: usuario._id },"teste", {
            expiresIn: '1d',
        });

        res.status(200).send({ token:token, _id:usuario._id});
    } catch (error) {
        console.error(error); // Log do erro para facilitar o debug
        res.status(500).send({ error: 'Erro ao processar a solicitação de login.' });
    }
};

module.exports = { login };