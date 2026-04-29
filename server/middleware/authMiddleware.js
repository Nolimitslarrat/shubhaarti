const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            const admin = await prisma.admin.findUnique({
                where: { id: decoded.id }
            });
            
            if (admin) {
                // Omit password from the req.admin object
                const { password, ...adminWithoutPassword } = admin;
                req.admin = adminWithoutPassword;
            } else {
                return res.status(401).json({ message: 'Not authorized, admin not found' });
            }
            
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
