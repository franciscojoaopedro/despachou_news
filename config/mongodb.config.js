const mongoose=require("mongoose")


async function connection_mongodb(){
    try {
        await mongoose.connect("mongodb://localhost:27017/",{
            dbName:"db_despachou",
        })
        .then(()=>{console.log({Message:`BANCO DE DADOS CONECTADO `} , "DATA DA CONEXÃO:",new Date().toLocaleString({}))})
        .catch((error)=>console.log(error))
    } catch (error) {
        console.log("erro ao conectar a db")
       
    }
}

module.exports=connection_mongodb