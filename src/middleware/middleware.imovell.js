async function validacaoPublicarImovel(req,res,next){
    try {
        const {
            descricao,endereco,
            proprietario,tipo,titulo,
            valor}=req.body
        if(descricao =="" || endereco=="" || proprietario==""||tipo=="" ||titulo==""||valor==""){
           return res.status(404).json({
                error:true,
                message:"Todos os campos têm que ser preenchidos"
            })
        }
       
        next()
    } catch (error) {
      return  res.json({
        error:true,
        message:"Não possivel publicar o imovel porque os dados não estão completos!",
        messageError:error
      })
    }
    }
    
    
    
    
    module.exports={
        validacaoPublicarImovel
    }