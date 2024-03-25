const express=require("express")
const { login } = require("../auth/session")
const session_router=express.Router()


session_router.post("/login",login)

module.exports=session_router