const cloudinary=require("../../../config/cloudinary.config")
const delete_files_in_uploads = require("../../functions/delete_file_uploads");
const { create_usuario, buscar_todos_usuarios, Usuario } = require('../../models/model.usuario');

let fileN=""
const criar_um_usuario = async (req, res) => {
  const { nome, email,telefone} =  req.body;
  try {
    const file= await req.file
    if(!file){
      try {
        if(!nome ||!email){
          return res.json({
            statusCode:404,
            message:"Não é permitido campos vazios, podes verficar [nome,email,senha,telefone,tipo]"
          }) 
        }
          const usuario=await Usuario.create({
            avatar:"https://res.cloudinary.com/dgimdhev9/image/upload/v1707461465/cloudnary-despachou/profile/cld-sample-5.jpg",
            email,
            nome,telefone
          })
          return res.status(201).json({
          message:"Usuário criado com sucesso",
          usuario
        })
        
      } catch (error) {
        res.json({
          error,
          message:"erro  ao criar o user"
        })
      }
      return res.json({
        statusCode:404,
        message:"Não foi possivel fazer o upload do avatar do usuario"
      }) 
    }
    if(!nome ||!email){
      return res.json({
        statusCode:404,
        message:"Não é permitido campos vazios, podes verficar [nome,email,senha,telefone,tipo]"
      }) 
    }
    await cloudinary.uploader.upload(file.path,{allowed_formats:["jpeg","png","jpg"],folder:"cloudnary-despachou/profile"})
    .then(async (avatar)=>{
      const usuario=await create_usuario({
        nome,
        email,
        senha,
        avatar:avatar.secure_url,
        telefone,
        tipo})
        return res.json({
        statusCode:201,
        message:"Usuário criado com sucesso",
        usuario
      })
    })
    .catch((error)=>{
      console.log(error)
      return res.json({message:"error ao enviar o file na cloudinary"})
    })
    fileN=file.filename
   await delete_files_in_uploads(file.filename)
    
  
    console.log(file)
   
    
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
  finally{
    await delete_files_in_uploads(fileN)
  }
};

const encontrar_todos_usuarios=async(req,res)=>{
  try {
      const list=["pedro","ngunga"]
      const usuarios= await Usuario.find()
      if(!list){
        return res.status(404).json({message:"lista de usuarios vazia",list:[]})
      }
       return res.status(200).send({ message: 'lista de todos usuarios',usuarios});
  } catch (error) {
    return res.status(400).send({
      statusCode:400,
       error: error.message,
       message:"não foi possivel buscar todos os usuarios" });
  }
}
const encontrar_um_usuario = async (req, res) => {
  const { email } = req.params;
  try {
    const usuario = await Usuario.findOne({email:email}, '-senha');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json({ message: 'Usuário encontrado', usuario });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao buscar o usuário', error: error.message });
  }
};




const encontrar_um_usuarioID= async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({_id:id}, '-senha');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json({ message: 'Usuário encontrado', usuario });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao buscar o usuário', error: error.message });
  }
};



module.exports = { criar_um_usuario,
  encontrar_todos_usuarios,
  encontrar_um_usuario,
  encontrar_um_usuarioID
};