
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , web = require('./routes/web')
  , install = require('./routes/install')
  , endpoint = require('./routes/endpoint')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('host', process.env.HOST || 'localhost');
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.set('host', 'localhost');
  app.use(express.errorHandler());
});

app.get('/', routes.index(app.get('host'), app.get('port')));
app.get('/update', web.update_form);
app.post('/update', web.update);
app.get('/install/:name', install.install(app.get('host'), app.get('port')));
app.get('/uninstall/:name', install.uninstall(app.get('host'), app.get('port')));
app.get('/scripts/:name', endpoint.read);
app.post('/scripts/:name', endpoint.create);
app.put('/scripts/:name', endpoint.update);
app.delete('/scripts/:name', endpoint.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
