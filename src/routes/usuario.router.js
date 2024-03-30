const express=require("express")
const { criar_um_usuario, encontrar_todos_usuarios,encontrar_um_usuario } = require("../controllers/usuario/usuario.controllers")
const upload = require("../functions/multer")
const router_usuario=express.Router()
   
router_usuario.get("/todos",encontrar_todos_usuarios)
router_usuario.get("/one/:id",encontrar_um_usuario)
router_usuario.post("/create",upload.single("image"),criar_um_usuario)


module.exports=router_usuario