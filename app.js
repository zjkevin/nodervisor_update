
/**
 * Declare Module dependencies
 */

var express = require('express'),
	path = require('path'),
	config = require('./config'),
	schema = require('./sql/schema');
	//sessionstore = require('connect-session-knex')(express);

// Express App Server
var app = express();

// Settings for all environments
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('env', config.env);

var Knex = require('knex');
var db = Knex(config.db);

schema.create(db);
config.readHosts(db,function(){console.log(config.hosts)});
//console.log(config.hosts);
//var knexsessions = Knex.initialize(config.sessionstore);

/**
 * Set up Middleware
 */
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));


var morgan = require('morgan') 
app.use(morgan('dev'))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var methodOverride = require('method-override')
//app.use(methodOverride('X-HTTP-Method-Override'))

const session = require('express-session');
const KnexSessionStore = require('./routes/index1.js')(session);
const store = new KnexSessionStore(); // defaults to a sqlite3 database

app.use(session({
    secret: 'keyboard cat',
    cookie: {

        maxAge: 7 * 24 * 60 * 60 * 1000 // 2 seconds for testing

    },
    store: store
}));


//app.use(express.session({
//    secret: config.sessionSecret,
//    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
//    store: new sessionstore({knex: knexsessions, tablename: 'sessions'})
//}));


//var count = 0;



//app.use('/', function (req, res, next) {
//
//    var n = req.session.views || 0
//
//    req.session.views = ++n
//
//    res.end(n + ' views')
//
//})





//app.use(app.router);
//app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for Dev Env only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}
//
var supervisordapi = require('supervisord');

/**
 * Set routes
 */
var routes = require('./routes')({
	'app': app,
	'config': config,
	'supervisordapi': supervisordapi,
	'db': db
});
//
/**
 * Start Express Server
 */
app.listen(app.get('port'), function(){
	console.log('Nodervisor launched on port ' + app.get('port'));
});
