/*
 * GET/POST hosts page
 */

exports.hosts = function(params) {
	var config = params.config;
	var db = params.db;
	return function(req, res) {

		if ((!req.session.loggedIn) || (req.session.user.Role != 'Admin')) {
			res.redirect('/login');
		} else if (req.body.delete !== undefined) {
			if (req.params.idHost) {
				params.db('hosts').delete()
				.where('idHost', req.params.idHost)
				.then(function() {
					params.config.readHosts(params.db, function(){
						res.redirect('/hosts');
					});
				})
				.catch(function(error) { console.error(error); });
			}
		} else if (req.body.submit !== undefined) {
			if (req.params.idHost == 'new') {
				params.db('hosts').insert({
					Name: req.body.name,
					Url: req.body.url,
					idGroup: req.body.group,
				}, 'idHost').then(function(insertId){
					params.config.readHosts(params.db, function(){
						res.redirect('/host/' + insertId);
					});
				})
				.catch(function(error) { 
					console.error(error);
					res.redirect('/hosts');
				});
			} else {
				var info = {
					Name: req.body.name,
					Url: req.body.url,
					idGroup: req.body.group !== 'null' ? req.body.group : 0
				};

				console.log(info);

				params.db('hosts').update(info)
				.where('idHost', req.params.idHost)
				.then(function() {
					params.config.readHosts(params.db, function(){
						res.redirect('/host/' + req.params.idHost);
					});
				})
				.catch(function(error) { console.error(error); });
			}
		} else {
			var qry = params.db;

			if (req.params.idHost) {
				if (req.params.idHost == 'new') {
					qry('groups').select('idGroup', 'Name')
					.then(function(groups){
						res.render('edit_host', {
							title: 'Nodervisor - New Host',
							host: null,
							groups: groups,
							session: req.session
						})
					})
					.catch(function(error) { console.error(error); });
				} else {
					qry('hosts').where('idHost', req.params.idHost)
					.then(function(hosts) {
						qry('groups').select('idGroup', 'Name')
						.then(function(groups){
							res.render('edit_host', {
								title: 'Nodervisor - Edit Host',
								host: hosts[0],
								groups: groups,
								session: req.session
							});
						})
						.catch(function(error) { console.error(error); });	
					})
					.catch(function(error) { console.error(error); });



					//.exec(function(err, host){
					//	qry = params.db('groups').select('idGroup', 'Name');
					//	qry.exec(function(err, groups){
					//		res.render('edit_host', {
					//			title: 'Nodervisor - Edit Host',
					//			host: host[0],
					//			groups: groups,
					//			session: req.session
					//		});
					//	});
					//});
				}
			} else {
				console.log("测试列表")
				qry.select('hosts.idHost', 'hosts.Name', 'hosts.Url', 'groups.Name AS GroupName')
				.from('hosts')
				.leftJoin('groups', 'hosts.idGroup', 'groups.idGroup')
				.then(function(rows) {
					res.render('hosts', {
						title: 'Nodervisor - Hosts',
						hosts: rows,
						session: req.session
					});							
				})
				.catch(function(error) { console.error(error); });
			}
		}
	};
};