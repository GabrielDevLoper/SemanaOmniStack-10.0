const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://hpgabriel:hp18360515@cluster0-ohklh.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

// Metódos HTTP: GET, POST, DELETE, PUT

// Tipos de Parâmetros:
// Query Params: req.query (filtros, ordenação, paginação, ...)
// Route Params: req.params (Identificar recurso na alteração ou na remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-Relacional)

server.listen(3333);