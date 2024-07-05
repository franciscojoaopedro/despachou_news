async function validacaoCriarUsuario(req,res,next){
try {
    const { nome, email,telefone} =  req.body;
    if(nome =="" || email=="" || telefone==""){
       return res.status(404).json({
            error:true,
            message:"Não é possivel criar um usuário com os campos vazios"
        })
    }
    if(!email.includes("@")){
        return res.status(404).json({
            error:true,
            message:"Email invalido,usar um email válido para poder receber o codigo de confirmação!"
        })
    }
    next()
} catch (error) {
  return  res.json({
    error:true,
    message:"Não possivel cadastrar o usuário porque os dados não estão completos!",
    messageError:error
  })
}
}




module.exports={
    validacaoCriarUsuario
}