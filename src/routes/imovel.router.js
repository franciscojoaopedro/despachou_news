const express=require("express")
const upload = require("../functions/multer")
const { 
    publicar_um_imovel, 
    listar_todos_imoveis, 
    listar_todos_imoveis_do_usuario,
    mostrar_detalhes_do_imovel,
    filtra_imoveis
} = require("../controllers/imovel/imoveis.controllers")
const verificarToken = require("../auth/middlewares")
const router_imovel=express.Router()

router_imovel.get("/listar", listar_todos_imoveis)
router_imovel.get("/:id/listar",listar_todos_imoveis_do_usuario)
router_imovel.get("/detalhes/:id/imovel",mostrar_detalhes_do_imovel)
router_imovel.get("/filtrar",filtra_imoveis)

router_imovel.post("/publicar",upload.array("image",5),publicar_um_imovel)
module.exports=router_imovel