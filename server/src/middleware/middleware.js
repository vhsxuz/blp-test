import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtSecretKey = 'secret_key';

export const authenticateUser = async (req, res, next) => {

    const token = req.headers['authorization'];
    console.log(token)
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Missing token',
        });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), jwtSecretKey);
        console.log(jwtSecretKey)
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Invalid token',
            });
        }

        req.user = user; // Attach the user object to the request for later use
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token',
        });
    }
};
