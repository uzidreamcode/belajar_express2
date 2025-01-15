const jwt = require('jsonwebtoken');

const { User } = require('../models'); 

module.exports = {
	verifyToken(req, res, next) {
    const tokenHeader = req.headers['authorization']; // Perhatikan lowercase
    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        return res.status(403).send({
            auth: false,
            message: "Error",
            errors: "No token provided or invalid format",
        });
    }
		let token = tokenHeader.split(' ')[1];

		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided"
			});
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
				if (!user) {
					return res.status(404).send({ message: "User not found" });
				}
				if (user.role.toUpperCase() === "ADMIN") {
					next();
					return;
				}
				res.status(403).send({ message: "Require Admin Role" });
			})
			.catch(err => {
				res.status(500).send({ message: err.message });
			});
	}
	
}