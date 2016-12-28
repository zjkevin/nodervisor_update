/*
 * GET supervisords json data
 */

exports.ajax_supervisord = function(params) {
	var config = params.config;
	var supervisordapi = params.supervisordapi;
	var async = require('async');
	return function(req, res) {

		if (!req.session.loggedIn) {
			res.send({error: 'Not logged in'});
		} else {
		
			var supervisords = {};
			var hosts = [];
			for (var idHost in config.hosts) {
				hosts.push(config.hosts[idHost]);
			}
			//遍历每一台服务器
			async.each(hosts, function(host, callback){
				console.log(callback)
				console.log(host.Url);
				var supclient = supervisordapi.connect(host.Url);
				var processinfo = supclient.getAllProcessInfo(function(err, result){
					console.log(err)
					console.log(result)
					if (err === null) {
						supervisords[host.idHost] = {
							host: host,
							data: result
						};
						return callback();
					} else {
						supervisords[host.idHost] = {
							host: host,
							data: err
						};
						return callback();
					}
				});
			}, function(err){
				res.send(supervisords);
			});
		}
	};
};