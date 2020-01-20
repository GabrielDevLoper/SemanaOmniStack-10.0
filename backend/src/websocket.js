const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];

exports.setupWebsocket = (server) => {
    const io = socketio(server);

    io.on('connection', socket => {
        console.log(socket.id);
        console.log(socket.handshake.query);
        const { latitude, longitude, tecnologias } = socket.handshake.query;
    
        connections.push({
            id:socket.id,
            coordinates:{
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            tecnologias: parseStringAsArray(tecnologias)
        });
    });
};

exports.findConnections = (coordinates, tecnologias) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connections.coordinates) < 10 
            && connection.tecnologias.some(item => tecnologias.includes(item))
    });
}