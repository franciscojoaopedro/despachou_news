const Favorite = require("../../models/model.favorite");


// Adicionar um favorito
exports.addFavorite = async (req, res) => {
    try {
        const { usuarioID, imovelID } = req.body;

        // Verificar se o imóvel já está nos favoritos antes de adicionar
        const existingFavorite = await Favorite.findOne({ usuarioID, imovelID });
        if (existingFavorite) {
            return res.status(404).json({ message: "Imóvel já está nos favoritos" });
        }

        const newFavorite = await Favorite.create({ usuarioID, imovelID });
        res.status(201).json({
            message: "Um imovel adicionado aos favoritos",
            newFavorite
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Listar todos os favoritos de um usuário
exports.listFavoritesByUser = async (req, res) => {
    try {
        const { usuarioID } = req.params;
        const favorites = await Favorite.find({ usuarioID })
        .populate("imovelID");
        return res.status(200).json(favorites);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

// Deletar um favorito
exports.deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const favorite = await Favorite.findOne({imovelID: {_id:id} });


        res.json({favorite})
        // if (!favorite) {
        //     return res.status(404).json({ message: "Favorito não encontrado" });
        // }

        // // Remove o imóvel associado ao favorito
        // const imovelID = favorite.imovelID;
        // await Imovel.findOneAndDelete({ _id: imovelID });

        
    } catch (error) {
        res.json({ message: error.message });
    }
};