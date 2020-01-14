const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAasArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res){
        const { github_username, tecnologias, latitude, longitude} = req.body;

        //Código abaixo é para verificar se o dev ja foi cadastrado.
        let dev = await Dev.findOne({github_username});

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const {avatar_url, bio, name = login} = response.data
        
            const techsArray = ParseStringAasArray(tecnologias);
        
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                tecnologias:techsArray,
                location,
            })
        }
    
        
        return res.json(dev);
    }
}