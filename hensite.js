

/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path');

var app = express();

var Twig = require('twig'),
	twig_obj = require('twig_obj');
Twig.extend(twig_obj);

var	home = require('./routes/home.js'),
	projects = require('./routes/projects.js');


try{
	var settings = require('./settings.secret.json');
	app.set('port', settings.port_number);
} catch(e){
	app.set('port', 3001);
}


// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
// establish all the routes

// the single homepage
app.get('/', home.index);

// everything to do with projects
app.get('/projects', projects.home);
app.get('/projects/p/*', projects.home);

app.get('/projects/search/', projects.search);

app.get('/projects/*', projects.select);

// run the server
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
