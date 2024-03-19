/*const multer = require('multer');
const { Imovel } = require('../models');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });


const hospedarFotos =async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const imovel = await Imovel.findByIdAndUpdate(id, { foto: filename });
  
  if (!imovel) {
    return res.status(404).send({ error: 'Imóvel não encontrado!' });
  }
  
  console.log({ id,filename})
  return res.status(200).send({ message: 'Foto do imóvel enviada com sucesso!' });
})

router.get('/:id/foto', async (req, res) => {
  const { id } = req.params;

  const imovel = await Imovel.findById(id);

  if (!imovel) {
    return res.status(404).send({ error: 'Imóvel não encontrado!' });
  }

  const fotoPath = `./uploads/${imovel.foto}`;

  res.sendFile(fotoPath);
});

module.exports = router;

*/