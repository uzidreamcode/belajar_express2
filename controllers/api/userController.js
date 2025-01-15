const { User } = require('../../models'); // Perhatikan huruf besar
const Validator = require('fastest-validator');
const v = new Validator();
const bcrypt = require('bcryptjs');

module.exports = {
    index: async (req, res) => {
        try {
            const response = await User.findAll({
                attributes: ['email', 'role'],
            });
            return res.status(200).json(response); 
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetching data',
                error: error.message,
            });
        }
    },
};
