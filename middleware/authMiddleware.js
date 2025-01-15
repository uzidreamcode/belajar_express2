const jwt = require('jsonwebtoken');

const { User } = require('../models'); 

module.exports = {
	verifyToken(req, res, next) {
		let tokenHeader = req.headers['Authorization'];
		let token = tokenHeader.split(' ')[1];

		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided"
			});
		}

		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: "Error",
					errors: err
				});
			}
			req.userId = decoded.id;
			next();
		});
	},

	isAdmin(req, res, next) {
		User.findByPk(req.userId)
			.then(user => {
				user.getRoles().then(roles => {
					for (let i = 0; i < roles.length; i++) {
						console.log(roles[i].name);
						if (roles[i].name.toUpperCase() === "ADMIN") {
							next();
							return;
						}
					}
					res.status(403).send({
						auth: false,
						message: "Error",
						message: 'Require Admin Role',
					});
					return;
				})
			})
	},
}