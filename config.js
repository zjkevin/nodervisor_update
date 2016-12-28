var config = {};

// Database configuration params.
// These are the connection parameters passed to our Knex db wrapper.
// Uncomment/Comment one of the below to switch between either Mysql or Sqlite.
// The format for this object is taken directly from Knex's connection object.
// Refer to the following if you wish to use PostgreSQL or connection pooling.
// http://knexjs.org/#Installation-client
// --
// Mysql Config:
//
// config.db = {
// 	client: 'mysql',
// 	connection: {
// 		host: 'localhost',
// 		user: 'root',
// 		password: '',
// 		database: 'nodervisor',
// 		charset: 'utf8',
// 	}
// };
//
// --
// We're using Sqlite by default now.
// Sqlite config:
//
config.db = {
	client: 'sqlite3',
	connection: {
		filename: './nodervisor.sqlite'
	}
};
// End of Database config

// Session storage config
// We're using Knex as with the db above, but only using sqlite and not mysql
// The express-session-knex module seems to have issues with mysql locks.
config.sessionstore = {
	client: 'sqlite3',
	connection: {
		filename: './nv-sessions.sqlite'
	}
};

// Application env config
config.port = process.env.PORT || 3000;
config.env = process.env.ENV || 'production';
config.sessionSecret = process.env.SECRET || '1234567890ABCDEF';

// Read and write settings
config.readHosts = function(db, callback){
	//var query = db('hosts')
	//	.join('groups', 'hosts.idGroup', '=', 'groups.idGroup', 'left')
	//	.select('hosts.idHost', 'hosts.Name', 'hosts.Url', 'groups.Name AS GroupName');
//	db.select('idHost', 'Name', 'Url').from('hosts').on('query',function(data){
//		console.log('2222222222222222222222222222');
//		var hosts = {};
//		console.log(data);
//		for (var host in data) {
//			hosts[data[host].idHost] = data[host];
//		}
//		config.hosts = hosts;
//		console.log(hosts);
//	});
	//db.select('*').from('hosts')
	//.on('query', function(data){
	//	console.log("111111111111112222222222222222")
  	//	console.log(data);
	//})
	//.then(function() {
  	//	// ...
	//});

	//db.select('hosts.idHost', 'hosts.Name', 'hosts.Url', 'groups.Name AS GroupName').from('hosts').leftJoin('groups', 'hosts.idGroup', 'groups.idGroup')
	//.asCallback(function(err, rows) {
    //  	//console.log(rows);
	//	var hosts = {};
	//	for (var host in rows) {
	//		hosts[rows[host].idHost] = rows[host];
	//	}
	//	config.hosts = hosts;
	//	console.log(hosts);
	//	console.log(config)
    //});
	db.select('hosts.idHost', 'hosts.Name', 'hosts.Url', 'groups.Name AS GroupName').from('hosts').leftJoin('groups', 'hosts.idGroup', 'groups.idGroup')
	.then(function(rows) {
      	//console.log(rows);
		var hosts = {};
		for (var host in rows) {
			hosts[rows[host].idHost] = rows[host];
		}
		config.hosts = hosts;
		// Call the callback passed
		if (callback) {
			callback();
		}
		
	})
	.catch(function(error) { console.error(error); });
    
};

module.exports = config;
