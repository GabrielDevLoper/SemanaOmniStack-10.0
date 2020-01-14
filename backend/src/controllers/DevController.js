const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        const { github_username, tecnologias, latitude, longitude} = req.body;

        //Código abaixo é para verificar se o dev ja foi cadastrado.
        const dev = await Dev.findOne({github_username});
    
        const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const {avatar_url, bio, name = login} = response.data
    
        const techsArray = tecnologias.split(',').map(techs => techs.trim());
    
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude],
        }
    
        const dev = await Dev.create({
            github_username,
            name,
            bio,
            avatar_url,
            tecnologias:techsArray,
            location,
        })
        return res.json(dev);
    }
}