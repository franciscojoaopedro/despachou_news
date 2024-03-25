const { Imovel } = require("../../models/model.imovel");
const Notificacao = require("../../models/model.notificacao");
const Reserva = require("../../models/model.reserva");
const { Usuario } = require("../../models/model.usuario");

exports.solicitarAluguel = async (req, res) => {
  const { imovelID, usuarioID, dataInicio, dataFim } = req.body;

  // Verificar se o imóvel já está reservado nas datas solicitadas
  const reservaExistente = await Reserva.findOne({
    imovelID,
    dataFim: { $gte: dataInicio },
    dataInicio: { $lte: dataFim },
    status: 'ativa'
  });

  if (reservaExistente) {
    return res.status(400).json('Imóvel já está reservado nas datas solicitadas.');
  }
  const novaReserva = await Reserva.create({
    imovelID,
    usuarioID,
    dataInicio,
    dataFim
  });


  // Enviar notificação ao proprietário do imóvel
  const imovel = await Imovel.findById(imovelID);
  const proprietarioId = imovel.proprietario; // Assumindo que imovel tem um campo proprietario

  const novaNotificacao = await Notificacao.create({
    destinatario: proprietarioId,
    mensagem: `Nova solicitação de aluguel para o imóvel ${imovelID} de ${usuarioID}`,
    tipo: 'solicitacaoAluguel',
    dadosAssociados: { reservaId: novaReserva._id }
  });

  await novaNotificacao.save();
    return res.status(201).send({
    message:'Solicitação de aluguel enviada com sucesso.',
    novaReserva,
    novaNotificacao,
  });

};

exports.cancelarReserva = async (req, res) => {
    const { reservaId } = req.params;
  
    const reserva = await Reserva.findByIdAndUpdate(reservaId, { status: 'cancelada' }, { new: true });
  
    if (!reserva) {
      return res.status(404).send('Reserva não encontrada.');
    }
  
    res.send(reserva);
  };