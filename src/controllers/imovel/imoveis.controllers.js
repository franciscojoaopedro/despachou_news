const { Types,Schema } = require("mongoose")
const cloudinary=require("../../../config/cloudinary.config")
const { Imovel,buscar_imoveis,imoveis_do_usuario, detalhes_do_imovel } = require("../../models/model.imovel")


async  function publicar_um_imovel(req,res){
    const {area,bairro,banheiros,
    descricao,endereco,
    proprietario,provincia,quartos,
    referencia,tipo,titulo,vagasGaragem,
    valor}=req.body
    const file=req.files
    try {
        if(!file){
            return res.json({
                message:"Não foi possivel publicar o imovel, porque não tem fotos"
            })
        }
        if(!bairro){
            return res.json({
                message:"Não foi possivel publicar o imovel, porque os campos estão vazios , é necessarios todas informações  do imovel"
            })
        }
        const upload = async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: 'cloudnary-imoveis',
              public_id: `${Date.now()}-${file.originalname}`,
              allowed_formats:["jpeg","png","jpg","webp","auto"]
            });
            return result.secure_url;
          };
        const fotos=await Promise.all(req.files.map(file => upload(file)));

        await Imovel.create({
            area,bairro,banheiros,descricao,
            endereco,fotos,proprietario,provincia,quartos,
            referencia,tipo,titulo,vagasGaragem,valor
        })
        .then((imovel)=>{
            return res.json({
                statuCode:201,
                message:"Imovel foi criado e publicado com sucesso",
                imovel
            })
        })
        .catch((error)=>{
            throw error
        })
        return res.json({message:"imovel foi publicado com sucesso!",fotos})
    } catch (error) {
        console.log({messageError:"não funciona",error})
    }
}
async function listar_todos_imoveis(req,res){
    try {
    buscar_imoveis()
     .then(async(response)=>{
        const imoveis=await response
        if(!imoveis){
            return res.json({
                statuCode:200,
                message:"Nenhum imovel encontrado",
                imoveis:imoveis
            })
        }
        return res.json({
            statuCode:200,
            message:"Todos os imoveis",
            imoveis:imoveis
        })
     })
     .catch((error)=>{
        return res.json({
            statuCode:200,
            message:"Nenhum imovel encontrado",
            imoveis:[],
            message:error
        })
     })
     
    } catch (error) {
        return res.json({
            message:"Não possivel listar os imoveis",
            messageError:error
        })
    }
}
async function listar_todos_imoveis_do_usuario(req,res){
    try {
        const {id}=req.params
        imoveis_do_usuario(id)
        .then(async(response)=>{
            const imoveis= await response
            if(!imoveis==[] || !imoveis==null || !imoveis){
                return res.json({
                    statuCode:200,
                    message:"Nenhum imovel encontrado",
                    imoveis:imoveis
                })
            }else{
                return res.json({
                    statuCode:200,
                    message:"Todos os imoveis",
                    imoveis:imoveis
                })
            }
         })
         .catch((error)=>{
            return res.json({
                statuCode:200,
                message:"Nenhum imovel encontrado",
                imoveis:[],
                message:error
            })
         })
    } catch (error) {
        return res.json({
            message:"Não possivel listar os imoveis do usuário",
            messageError:error
        })
    }
}

async function mostrar_detalhes_do_imovel(req,res){
    try {
        const {id}=req.params
        detalhes_do_imovel(id)
        .then(async(response)=>{
            const imovel=await response
            if(!imovel){
                return res.json({
                        statuCode:400,
                        message:" Não encontrado Imovel encontrado",
                        imovel:[]})
            }
            return res.json({
                statuCode:200,
                message:"Detalhes do imovel",
                imovel:imovel
            })
            
        })
        .catch((error)=>{
            return res.json({
                statuCode:200,
                message:"Não é possivel mostrar detalhes desse imovel",
                imoveis:[],
                message:error
            })
        })
    } catch (error) {
        return res.json({
            message:"Não possivel mostrar o imovel",
            messageError:error
        })
    }
}

async function filtra_imoveis(req,res){
    const {tipo,valor,provincia,bairro}=req.query
    try {
        let filtro={
            tipo,valor,provincia,bairro
        }
        const pipeline = [
            {
              $group: {
                _id: {
                  bairro: "$bairro",
                  provincia: "$provincia",
                  tipo: "$tipo",
                  valor:"$valor"
                },
                
              },
              $
            },
          ];
        const imoveis_filtrados= await Imovel.aggregate([
            {
              $group: {
                _id: {
                  bairro: "$bairro",
                  provincia: "$provincia",
                  tipo: "$tipo",
                  valor:"$valor"
                },
              },
              $project:{
                
                    bairro: "$bairro",
                    provincia: "$provincia",
                    tipo: "$tipo",
                    valor:"$valor"
                  
              }
              
            },
          ])

        return res.json({
            message:"imoveis filtrados",
            filto:filtro,
            imoveis_filtrados
        })
    } catch (error) {
        
    }
}
module.exports={
    publicar_um_imovel,
    listar_todos_imoveis,
    listar_todos_imoveis_do_usuario,
    mostrar_detalhes_do_imovel,
    filtra_imoveis
}