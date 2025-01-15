const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models'); 

module.exports = {
    async signin(req, res) { 
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } }); 
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Periksa validitas password
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({ message: "Invalid password" });
            }

            // Buat token JWT
            const token = jwt.sign(
                { id: user.id_user, role: user.role },
                process.env.JWT_SECRET,
                {
                    expiresIn: 86400, // 24 jam
                }
            );

            res.status(200).send({
                accessToken: token,
                message: "Success",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
