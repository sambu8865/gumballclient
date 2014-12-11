
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , gumball = require('./routes/getgumball')
, gumball1 = require('./routes/postgumball');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/gumball',gumball.getgumball);
app.post('/gumball',gumball1.postgumball);

var ip=process.env.OPENSHIFT_NODEJS_IP||'127.0.0.1',
    port=process.env.OPENSHIFT_NODEJS_PORT||'8080';

http.createServer(function(req,res){
  console.log('Express server listening on ip ' +ip +'port' +port);
}).listen(port,ip);


