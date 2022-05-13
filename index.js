// require http library from node.js
const http = require('http');
// require read from disk
const fs = require('fs');
// build server
const httpServer = http.createServer();
// add a listening event
httpServer.on('listening', () => console.log('Listening...'));
httpServer.on('request', (req, res) => {
    if (req.url === '/') {
        // read file
        res.end(fs.readFileSync('index.html'));
        return;
    }
});

httpServer.listen(8080);
