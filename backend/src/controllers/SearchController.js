const Dev = require('../models/Dev');
const ParseStringAasArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res){
        //Buscar todos devs num raio de 10km e filtrar por tecnologias.
        const { latitude, longitude, tecnologias } = req.query;

        const techsArray = ParseStringAasArray(tecnologias);

        const devs = await Dev.find({
            tecnologias: {
                $in: techsArray,
            },
            location:{
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
       

        return res.json({ devs });
    },
}