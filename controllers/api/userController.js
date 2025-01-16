const { User, Karyawan } = require('../../models'); // Sesuaikan dengan jalur file yang benar
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

    pagination: async (req, res) => {
      const page = parseInt(req.query.page, 10) || 1; // Default ke halaman 1
      const limit = parseInt(req.query.limit, 10) || 10; // Default limit 10
      
      const offset = (page - 1) * limit; // Perhitungan offset
    
      try {
        // Mengambil data dari database
        const result = await User.findAndCountAll({
          attributes: ['email', 'role','id_karyawan'],

          include: [
            {
                model: Karyawan, 
                attributes: ['nama','alamat','no_telp'], 
            },
        ],
          offset: offset,
          limit: limit,
        });
    
        // Menyusun response dengan informasi pagination
        const totalPages = Math.ceil(result.count / limit); // Total halaman
        res.json({
          page: page,
          totalPages: totalPages,
          totalRecords: result.count,
          data: result.rows,
        });
      } catch (err) {
        res.status(500).json({ error: err.message }); // Menangani error
      }
    },
    

    profile: async (req, res) => {
        try {
            const response = await User.findByPk(req.userId, {
                attributes: ['email', 'role', 'created_at', 'updated_at','id_karyawan'],
                include: [
                  {
                      model: Karyawan, 
                      attributes: ['nama'], 
                  },
              ],
            });zx`x`
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetching data',
                error: error.message,
            });
        }
    },


    bulkStore: async (req, res) => {
      try {
          const schema = {
              items: {
                  type: 'array',
                  items: {
                      type: 'object',
                      props: {
                          nama: { type: 'string', empty: false },
                          alamat: { type: 'string', empty: false },
                          no_telp: { type: 'string', empty: false },
                          email: { type: 'email', empty: false },
                          password: { type: 'string', min: 6, empty: false },
                          role: { type: 'string', empty: false },
                      },
                  },
              },
          };
  
          const validate = v.validate(req.body, schema);
  
          if (validate.length) {
              return res.status(400).json({ message: 'Validation failed', errors: validate });
          }
  
          // Bulk insert ke tabel Karyawan
          const karyawanData = req.body.items.map((item) => ({
              nama: item.nama,
              alamat: item.alamat,
              no_telp: item.no_telp,
          }));
          const karyawanResponse = await Karyawan.bulkCreate(karyawanData, { returning: true });
  
          // Bulk insert ke tabel User
          const userData = karyawanResponse.map((karyawan, index) => ({
              id_karyawan: karyawan.id_karyawan,
              email: req.body.items[index].email,
              password: bcrypt.hashSync(req.body.items[index].password, 8), // Hash password
              role: req.body.items[index].role,
          }));
          await User.bulkCreate(userData);
  
          return res.status(201).json({ message: 'Data was inserted!' });
      } catch (err) {
          console.error('Error:', err);
          return res.status(500).json({ message: 'Error inserting data', error: err.message });
      }
  },
  
  

    add_karyawan: async (req, res) => {
      try {
          const schema = {
              nama: { type: 'string', empty: false },
              alamat: { type: 'string', empty: false },
              no_telp: { type: 'string', empty: false },
              email: { type: 'email', empty: false },
              password: { type: 'string', empty: false },
              role: { type: 'string', empty: false },
          };
          const validate = v.compile(schema);
          const valid = validate(req.body);
  
          if (valid !== true) {
              console.error('Validation errors:', valid);
              return res.status(400).json({
                  message: 'Validation failed',
                  error: valid,
              });
          }
  
          // Hash password
          const hashedPassword = bcrypt.hashSync(req.body.password, 8);
          req.body.password = hashedPassword;
  
          const response = await Karyawan.create(req.body);
  
          const user = {
              id_karyawan: response.id_karyawan,
              email: req.body.email,
              password: hashedPassword,
              role: req.body.role,
          };
          await User.create(user); 
  
          return res.status(201).json(response);
      } catch (error) {
          console.error('Error details:', error);
          return res.status(500).json({
              message: 'Error adding data',
              error: error.message,
          });
      }
  },
  
};
