const ws = require('ws');

const SOCKET_PORT = 1712;

const initConnection = () => {
    const socket = new ws.WebSocketServer({ port: SOCKET_PORT });

    socket.on('connection', () => {
        console.log('client connected');
    });
}

module.exports = { initConnection };
