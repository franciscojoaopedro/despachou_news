const Pedido = require("../../models/model.pedido");









async function criarPedido(req,res){
        try {
            const {compradorID,imovelID}=req.params

            const verficarPedidoDoUsuario= await Pedido.findOne({
                compradorID:compradorID,
                imovelID:imovelID
            })

            if(!verficarPedidoDoUsuario){
                console.log("esta livre pode fazer pedido")
                const pedido= await Pedido.create({
                    compradorID,
                    imovelID
                })
                return res.status(201).json({
                    message:"pedido do imovel realizado com sucesso",
                    pedido
                })
            }
            else{
                return res.status(200).json({
                    message:"Só é possivel fazer pedido apenas uma vez a cada imovel",
                    
                })
            }

            




            
        } catch (error) {
            console.log("erro erro ao fazer um pedido")
        }
}

async function aceitarPedido(req,res){
    try {
        const {idPedido}=req.params

        const verficarPedido= await Pedido.findOne({_id:idPedido})

        if(verficarPedido){
            const pedido= await Pedido.updateOne({_id:idPedido},{estadoDoPedido:true},{new:true})
            return res.status(201).json({
                message:"Pedido aceite",
                pedido
            })
        }
        else{
            return res.status(200).json({
                message:"Pedido não encontrado",
                
            })
        } 
    } catch (error) {
        console.log("erro erro ao fazer um pedido")
    }
}
async function mostrarPedidosCompradorImovel(req,res){
  try {
    const {idUsuario}=req.params

    const pedidos= await Pedido.find({compradorID:idUsuario,})
    .populate("imovelID")
    return res.status(200).json({
        message:"todos os pedido encontrado",
        pedidos
    })

  } catch (error) {
    return res.status(200).json({
        message:"erro ao procurar os pedidos",
        
    })
  }
}

async function mostrarPedidosProprietarioImovel(req, res) {
    try {
        const { idUsuario } = req.params;
        const pedidos = await Pedido.find({})
          .populate({
            path: 'imovelID',
            match: { proprietario: idUsuario }
          })
            .populate({
                path:"compradorID"
            })
        const pedidosFiltrados = pedidos.filter(pedido => pedido.imovelID);
    
        return res.status(200).json({
          message: "Pedidos encontrados",
          pedidos: pedidosFiltrados
        });
    
      } catch (error) {
        return res.status(500).json({
          message: "Erro ao procurar os pedidos",
          error: error.message
        });
      }
}



module.exports={
    criarPedido,
    aceitarPedido,
    mostrarPedidosCompradorImovel,
    mostrarPedidosProprietarioImovel
} 