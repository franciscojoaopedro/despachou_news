const app = require("./app/app");
const fs=require("fs")
require("dotenv").config()
const connection_mongodb = require("./config/mongodb.config");
const upload = require("./src/functions/multer");
const router_usuario = require("./src/routes/usuario.router");
const router_imovel = require("./src/routes/imovel.router");
connection_mongodb()



app.use("/usuario",router_usuario)
app.use("/imovel",router_imovel)


const PORT=process.env.PORT_SERVER || 7788

const deleteFiles = async () => {
    setTimeout( async()=>{
        const files = await fs.promises.readdir('./uploads');
        for (const file of files) {
          await fs.promises.unlink(`./uploads/${file}`);
        }
        console.log('Todos os arquivos da pasta uploads foram apagados!');
    },6000)
  };
  
  
app.listen(PORT,()=>{
    deleteFiles();
    console.log({
        RUNNER:`OK`,
        MESSAGE:`SERVER IS RUNNING`,
        PORT:PORT,
        host:`http://localhost:${PORT}`
    })
})