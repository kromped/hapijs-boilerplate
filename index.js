var Hapi = require('hapi'),
    _ = require('lodash');

var server = new Hapi.Server();

server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layout',
    helpersPath: './views/helpers',
    partialsPath: './views/partials'
});

server.connection({port: 3000});

var templateHandler = function(request, reply) {
    var controller = encodeURIComponent(_.trim(request.params.controller, '/')),
        action = encodeURIComponent(request.params.action || 'index'),
        id = encodeURIComponent(request.params.id);

    reply.view(controller + '/' + action);
};

// controller only
server.route({
    method: ['GET', 'POST'],
    path: '/{controller*}',
    handler: templateHandler
});

// full path
server.route({
    method: ['GET', 'POST'],
    path: '/{controller}/{action}/{id?}',
    handler: templateHandler
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});