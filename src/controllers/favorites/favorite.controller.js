const Favorite = require("../../models/model.favorite");


// Adicionar um favorito
exports.addFavorite = async (req, res) => {
    try {
        const { usuarioID, imovelID } = req.body;
        
        const newFavorite = await Favorite.create({ usuarioID, imovelID });
        //const savedFavorite = await newFavorite;
        res.status(201).json({
            message:"Um imovel adicionado aos favoritos",
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
        .populate('imovelID');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar um favorito
exports.deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        await Favorite.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};