/*
 * GET supervisord page
 */

exports.supervisord = function(params) {
	return function(req, res) {
		console.log("1111eeee");
		if (!req.session.loggedIn) {
			res.redirect('/login');
		}else{
			res.render('supervisord', {
			title: 'Nodervisor - All Hosts',
			session: req.session
			});
		}
	};
};