'use strict';

let Hapi = require('hapi');
let Inert = require('inert');
let Http2 = require('http2');
let fs = require('fs');
let config = require('config');

// let options = {
//     key: fs.readFileSync(__dirname + '/server.key'),
//     cert: fs.readFileSync(__dirname + '/server.crt')
// };

let server = new Hapi.Server();
server.connection({
    // listener: Http2.createServer(options),
    // host: 'localhost',
    port: process.env.PORT || config.get('port'),
});

// Path.join(__dirname, '/app');
server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: config.get('app'),
            index: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/bower_components/{param*}',
    handler: {
        directory: {
            path: 'app/bower_components',
        }
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
