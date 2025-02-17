import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Token received:', token ? 'yes' : 'no');
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'No token, authorization denied' 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token verified for user:', decoded.user.id);
            req.user = decoded.user;
            next();
        } catch (jwtError) {
            console.error('Token verification failed:', jwtError);
            return res.status(401).json({ 
                success: false,
                message: 'Token is not valid' 
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error in auth middleware' 
        });
    }
};

export default auth; 