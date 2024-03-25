const express=require("express")
const body_parser=require("body-parser")
const cors=require("cors")

const app=express()




app.use(express.json())
app.use(express.json({limit: '100mb'}));
app.use(express.json({"Content-Type":'multipart/form-data'}))
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');

    next();
});




module.exports=app