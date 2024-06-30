const {model,Schema}= require("mongoose");
const ImovelSchema = require("./schema/schema.imovel");
const Imovel = model('Imovel', ImovelSchema);


async function criar_imovel({tipo,titulo,descricao,endereco,referencia,
    bairro,provincia,area,quartos,vagasGaragem,valor,fotos,proprietario}){

    try {
        const imovel=await Imovel.create({
            area,bairro,banheiros,
            descricao,endereco,fotos,
            proprietario,provincia,quartos,
            referencia,tipo,titulo,vagasGaragem,
            valor
        })
        .then((imovel)=>{
            return imovel
        })

    } catch (error) {
        
    }
}

async function buscar_imoveis(){
    try {     
        const imoveis=await Imovel.find().sort({ createdAt: 1 })
        .then( async(imoveis)=>{
            if(!imoveis){
                return null||[]
            }
            return  imoveis
        })
        .catch((error)=>{
            return error
        })
        return imoveis
    } catch (error) {
        throw {
            message: "Não possivel acessar ao banco de dados para listar os imoveis",
            messageError:error
        }
    }
}
async function  imoveis_do_usuario(id){
    try {     
        const imoveis=await Imovel.find({proprietario:id})
        .then( (imoveis)=>{
            if(!imoveis){
                return null || null
            }
            return  imoveis
        })
        .catch((error)=>{
            return error
        })
        return imoveis
    } catch (error) {
        throw {
            message: "Não possivel acessar ao banco de dados para listar os imoveis",
            messageError:error
        }
    }
}

async function detalhes_do_imovel(id){
    try {
        const imovel=await Imovel.findOne({_id:id})
        .populate('proprietario')
        if (!imovel) {
            return null; 
        }
        return imovel
    } catch (error) {
        throw {
            message: "Não possivel acessar ao banco de dados para mostrar os imovel",
            messageError:error
        }
    }
}
module.exports={
    Imovel,
    buscar_imoveis,
    imoveis_do_usuario,
    detalhes_do_imovel
}



