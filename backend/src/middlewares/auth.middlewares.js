import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.models.js';

export const requireSign = async (req, res, next) => {
    try {
        // Check if Authorization header exists and is in the correct format
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header is missing or invalid' });
        }

        // Extract token from Authorization header
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.jwt); // Ensure you use the correct environment variable name
        const userId = decoded.id;

        // Find the user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.log('Error in requireSign middleware:', error);
        res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
    }
};
