const prisma = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await prisma.admin.findUnique({ where: { email } });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                id: admin.id,
                email: admin.email,
                token: generateToken(admin.id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminExists = await prisma.admin.findUnique({ where: { email } });

        if (adminExists) {
            res.status(400).json({ message: 'Admin already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        if (admin) {
            res.status(201).json({
                id: admin.id,
                email: admin.email,
                token: generateToken(admin.id)
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    authAdmin,
    registerAdmin
};
