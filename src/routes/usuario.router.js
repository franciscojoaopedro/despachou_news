const express=require("express")
const { criar_um_usuario, encontrar_todos_usuarios,encontrar_um_usuario ,encontrar_um_usuarioID} = require("../controllers/usuario/usuario.controllers")
const upload = require("../functions/multer")
const { validacaoCriarUsuario } = require("../middleware/middleware.usuario")
const router_usuario=express.Router()
   
router_usuario.get("/todos",encontrar_todos_usuarios)
router_usuario.get("/one/:email",encontrar_um_usuario)
router_usuario.get("/user_id/:id",encontrar_um_usuarioID)
router_usuario.post("/create",upload.single("image"),validacaoCriarUsuario, criar_um_usuario)


module.exports=router_usuario