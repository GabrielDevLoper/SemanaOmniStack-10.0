const { Router } = require('express');

const routes = Router();


routes.post('/usuarios', (req, res) =>{
    console.log(req.body);
    return res.json({message:"hello omnistack"});
});

module.exports = routes;