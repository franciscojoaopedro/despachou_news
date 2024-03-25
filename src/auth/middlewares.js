const jwt=require("jsonwebtoken")
require("dotenv").config()

const verificarToken=async (req,res,next)=>{
    const authHeader =req.headers["authorization"];
    const token= authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(403)
        .send({error:"Token não fornecido!"});
    }

    try {
    const decoded = jwt.verify(token, "teste");
    req.usuarioId = decoded.id;
    next();
    } catch (error) {
        return res.status(401).send({ error: 'Token inválido!' });
    }
}

module.exports=verificarToken