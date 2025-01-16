const { User, Karyawan, Absensi } = require('../../models'); // Sesuaikan dengan jalur file yang benar
const Validator = require('fastest-validator');
const bcrypt = require('bcryptjs');
const multer = require('multer'); // Import multer
const path = require('path'); // Untuk bekerja dengan jalur file

// Konfigurasi multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads'); // Jalur absolut dari file ini
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});


const fileFilter = (req, file, cb) => {
    // Hanya terima file gambar
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2 }, // Batas ukuran file (2MB)
    fileFilter: fileFilter,
});

const v = new Validator();

module.exports = {
    absensi: [
        upload.single('foto'), // Middleware multer untuk menangani unggahan file
        async (req, res) => {
            try {
                // Validasi input selain file
                const schema = {
                    foto: { type: 'string', empty: false },
                };

                // Validasi file (gunakan req.file)
                if (!req.file) {
                    return res.status(400).json({
                        message: 'Foto is required',
                    });
                }

                const validate = v.compile(schema);
                const valid = validate({
                    foto: req.file.filename, // Ambil nama file dari multer
                });

                if (valid !== true) {
                    console.error('Validation errors:', valid);
                    return res.status(400).json({
                        message: 'Validation failed',
                        error: valid,
                    });
                }

                // Ambil data user
                const userResponse = await User.findByPk(req.userId, {
                    attributes: ['email', 'role', 'created_at', 'updated_at', 'id_karyawan'],
                    include: [
                        {
                            model: Karyawan,
                            attributes: ['nama', 'alamat', 'no_telp'],
                        },
                    ],
                });

                if (!userResponse) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Simpan data absensi
                const absensi = {
                    nama: userResponse.Karyawan.nama,
                    role: userResponse.role,
                    foto: req.file.filename, // Nama file yang diunggah
                    jam_absensi: new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                };

                await Absensi.create(absensi);

                return res.status(201).json({
                    message: 'Absensi berhasil dicatat',
                    data: absensi,
                });
            } catch (error) {
                console.error('Error details:', error);
                return res.status(500).json({
                    message: 'Error adding data',
                    error: error.message,
                });
            }
        },
    ],
};
