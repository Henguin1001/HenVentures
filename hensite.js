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
	blog = require('./routes/blog.js');


// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(express.cookieParser());
app.use(express.session({secret: 'henryissupercool'}));

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
app.get('/',home.index);
app.get('/about', home.about);


app.get('/blog', blog.multiPost);
app.get('/blog/page/*', blog.multiPost);
app.get('/blog/category/*', blog.category);
app.get('/blog/category/*/page/*', blog.category);
app.get('/blog/archive/*', blog.singlePost);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});