/*
 * GET/POST login page
 */

exports.login = function(params) {
	return function(req, res) {
		if (req.session.loggedIn) {
			res.redirect('/');
		}
		if (req.method === 'POST') {
			var email = req.body.email;
			console.log(email)
			//params.db('users')
			//	.where('Email', email)
			//	.exec(function(err, user){
			//		var error = 'Password failed';
			//		if (!err && (user.length > 0)) {
			//			bcrypt = require('bcrypt-nodejs');
			//			console.log(req.body.password);
			//			console.log(user[0].Password);
			//			req.session.loggedIn = bcrypt.compareSync(req.body.password, user[0].Password);
            //
			//		} else {
			//			error = 'Email not found';
			//		}
		    //
			//		if (!req.session.loggedIn) {
			//			res.render('login', {
			//				title: 'Nodervisor - Login',
			//				error: error
			//			});
			//		} else {
			//			req.session.user = user[0];
			//			res.redirect('/');
			//		}
			//	});
			params.db.select('Password','Role').from('users').where('Email','=',email)
			.asCallback(function(err,user) {
				var error = 'Password failed';
				if (!err && (user.length > 0)) {
					bcrypt = require('bcrypt-nodejs');
					console.log(req.body.password);
					console.log(user[0].Password);
					req.session.loggedIn = bcrypt.compareSync(req.body.password, user[0].Password);
					console.log(req.session.loggedIn)
				} else {
					error = 'Email not found';
				}
				if (!req.session.loggedIn) {
					res.render('login', {
						title: 'Nodervisor - Login',
						error: error
					});
				} else {
					console.log("Role----------------------")
					console.log(user[0].Role)
					req.session.user = user[0];
					res.redirect('/');
				}
			})
			.catch(function(error) { console.error(error); });
		} else {
		console.log("zhangjie");
			res.render('login', {
				title: 'Nodervisor - Login',
				session: req.session
			});
		}
	};
};



