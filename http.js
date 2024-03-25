const app = require("./app/app")
const server = require('http').createServer(app);
const io = require("socket.io")(server);

const fs=require("fs")
require("dotenv").config()
const connection_mongodb = require("./config/mongodb.config");
//const upload = require("./src/functions/multer");
const router_usuario = require("./src/routes/usuario.router");
const router_imovel = require("./src/routes/imovel.router");
const session_router = require("./src/routes/session.router");
const favorite_router = require("./src/routes/favorite.routes");
const messagem_router = require("./src/routes/messagem.routes");
const reserva_router = require("./src/routes/reserva.routes");
connection_mongodb()


app.get("/",async(req,res)=>{
  io.on("connection",async(socket)=>{
    console.log(`socket conectado: ${socket.id}`)
  })
  return res.status(200).json({
    message:"servidor funcionando.."
  })
})

const VERSION="/v1/api"

app.use(`${VERSION}/usuario`,router_usuario)
app.use(`${VERSION}/imovel`,router_imovel)
app.use(`${VERSION}/session`,session_router)
app.use(`${VERSION}/favorito/imovel`,favorite_router)
app.use(`${VERSION}/messagem`,messagem_router)
app.use(`${VERSION}/reserva`,reserva_router)


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
  


  

server.listen(PORT,()=>{
    deleteFiles();
    console.log({
        RUNNER:`OK`,
        MESSAGE:`SERVER IS RUNNING`,
        PORT:PORT,
        host:`http://localhost:${PORT}`
    })
})