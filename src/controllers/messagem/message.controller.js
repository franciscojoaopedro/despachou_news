const Mensagem = require('../../models/model.messagem');
const Notificacao = require('../../models/model.notificacao');

exports.enviarMensagem = async (req, res) => {
  const { remetente, destinatario, conteudo } = req.body;

  const novaMensagem = await Mensagem.create({
    remetente,
    destinatario,
    conteudo
  });

  await novaMensagem.save();

  // Opcional: enviar notificação de nova mensagem
  const novaNotificacao = await Notificacao.create({
    destinatario,
    mensagem: `Você recebeu uma nova mensagem de ${remetente}`,
    tipo: 'mensagem',
    dadosAssociados: { mensagemId: novaMensagem._id }
  });

  await novaNotificacao.save();

  res.status(201).send('Mensagem enviada com sucesso.');
};

exports.receberMensagens = async (req, res) => {
  const { usuarioId } = req.params;

  const mensagens = await Mensagem.find({ remetente: usuarioId }).populate('destinatario', 'nome');

  res.status(200).json(mensagens);
};


exports.minhasMensagens=async(req,res)=>{
  const { remetenteID,destinatarioID } = req.params;
  const mensagens = await Mensagem.find({ remetente: remetenteID ,destinatario:destinatarioID}).populate('destinatario', 'nome');
  res.status(200).json(mensagens);
}