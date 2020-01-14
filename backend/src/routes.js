const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/listarDevs', DevController.index);
routes.post('/addDevs', DevController.store);

routes.get('/procurar', SearchController.index);

  
module.exports = routes;