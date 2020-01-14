const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();


 routes.post('/addDevs', DevController.store);

  
module.exports = routes;