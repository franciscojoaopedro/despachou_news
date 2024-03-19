const {model}= require("mongoose");
const usuarioSchema = require("./schema/schema.usuario");
const Usuario = model('Usuario', usuarioSchema);

async function create_usuario({nome, email, senha, telefone, tipo, avatar}){
    try {
        const usuarioExiste=await Usuario.findOne({email:email})
        if(!usuarioExiste){
            const usuario= await Usuario.create({
                nome,
                email,
                avatar,
                senha,
                telefone,
                tipo
            })
            return usuario
        }else{
            const messageError="Infelizmente o usuario não foi criado"
            return messageError
        }
    } catch (error) {
        throw error
    }
}

async function buscar_um_usuario(id){
    try {
        
    } catch (error) {
        
    }
}
async function atualizar_usuario(id){

}

async function buscar_todos_usuarios(){
    try {
        const usuarios= await Usuario.find()
        if(!usuarios){
            return []
        }
        return usuarios
    
    } catch (error) {
        throw error
    }

}
async function apagar_um_usuario(id){

}



module.exports={create_usuario,buscar_todos_usuarios,Usuario}
