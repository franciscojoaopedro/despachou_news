
const mongoose=require("mongoose")
const reservaSchema = require("./schema/schema.reserva");

const Reserva=mongoose.model('Reserva', reservaSchema);

module.exports=Reserva