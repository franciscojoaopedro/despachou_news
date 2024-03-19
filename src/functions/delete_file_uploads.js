const fs=require("fs")

async function delete_files_in_uploads(files){
  setTimeout(async()=>{
        fs.unlink("./uploads/"+files,(error)=>{
          if(error){
            console.log("erro ao apagar o file")
          }
          console.log("file apagada com sucesso!")
        })
    },60000)
}
module.exports=delete_files_in_uploads