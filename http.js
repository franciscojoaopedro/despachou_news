
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
const pedido_router = require("./src/routes/pedido.routes");
const { Usuario } = require("./src/models/model.usuario");
const Mensagem = require("./src/models/model.messagem");

connection_mongodb()


app.get("/",async(req,res)=>{

  
  return res.status(200).json({
    message:"servidor funcionando.."
  })
})

const VERSION="/v1/api"

const users = {};

io.on("connection",async(socket)=>{
  console.log('Novo cliente conectado', socket.id);

  
    // Enviar lista de usuários online
    socket.on('users_online', async () => {
      const users = await Usuario.find();
      io.emit('users_online', users);
    });
    socket.on("enviar_messagem_on_user", async (data)=>{
      const {remetente,destinatario,conteudo}=data

      const message =await  Mensagem.create({
        destinatario,
        remetente,
        conteudo, 
      })
      
      console.log({
      message,
        id_socket:socket.id
      })
    })

    // Enviar mensagem
    socket.on('send_message', async (data) => {
      const { destinatario, remetente, conteudo } = data;
      const message =await  Mensagem.create({
        destinatario,
        remetente,
        conteudo, 
      })
    });

    socket.on("minhas_mensagens",async (userId)=>{

      const mensagens = await Mensagem.find({ remetente: userId }).populate('destinatario', 'nome');

      console.log(mensagens)
      socket.emit("mensagens_recebidas",mensagens)
  
    })

    

    

    socket.on("minhas_sms_on",async (data)=>{
      const {remetente ,destinatario}=data
      const myMessages = await Mensagem.find({ remetente:remetente ,destinatario:destinatario}).populate('destinatario', 'nome');
      console.log(myMessages,"tesando sms")
      socket.emit("my-ms",myMessages)
    })


    socket.on('user_online', async (userId) => {
      await Usuario.findOneAndUpdate({_id:userId}, { online: true });
      const users = await Usuario.find({ online: true });
      io.emit('users_online', users);
    });
    socket.on("testando",(messagem)=>{

      console.log(messagem)
    })

    socket.on('disconnect', async () => {
      console.log('Cliente desconectado', socket.id);
    const userId = Object.keys(users).find((key) => users[key] === socket.id);
    if (userId) {
      await Usuario.findByIdAndUpdate(userId, { online: false });
      delete users[userId];
      const onlineUsers = await Usuario.find({ online: true });
      io.emit('users_online', onlineUsers);
    }
    });
    socket.on("user_offline",async(userId)=>{
      await Usuario.findByIdAndUpdate({_id:userId}, { online: false });
      delete users[userId];

      const onlineUsers = await Usuario.find({ online: true });
      io.emit('users_online', onlineUsers);
    })
    socket.on("all_users",async()=>{
      const usuarios=await Usuario.find()
      socket.emit("usuarios_encontrados",usuarios);
    })



   
})

app.use(`${VERSION}/usuario`,router_usuario)
app.use(`${VERSION}/imovel`,router_imovel)
app.use(`${VERSION}/session`,session_router)
app.use(`${VERSION}/favorito/imovel`,favorite_router)
app.use(`${VERSION}/messagem`,messagem_router)
app.use(`${VERSION}/reserva`,reserva_router)
app.use(`${VERSION}/pedido`,pedido_router)


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