import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/details', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            success: true,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                profile: user.profile,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
});

// Update user profile
router.post('/details', auth, async (req, res) => {
    try {
        console.log('Request received:', {
            body: req.body,
            userId: req.user.id,
            headers: req.headers
        });

        const user = await User.findById(req.user.id);
        if (!user) {
            console.log('User not found:', req.user.id);
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        if (!req.body.profile) {
            console.log('Missing profile data in request');
            return res.status(400).json({
                success: false,
                message: 'Profile data is required'
            });
        }

        // Update user profile
        user.profile = {
            fullName: req.body.profile.fullName,
            dateOfBirth: req.body.profile.dateOfBirth || '',
            phone: req.body.profile.phone,
            address: req.body.profile.address,
            panCard: req.body.profile.panCard || '',
            aadharNumber: req.body.profile.aadharNumber || '',
            occupation: req.body.profile.occupation || '',
            annualIncome: Number(req.body.profile.annualIncome) || 0
        };

        await user.save();
        
        const responseData = {
            success: true,
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                profile: user.profile,
                createdAt: user.createdAt
            }
        };

        console.log('Sending response:', responseData);
        res.json(responseData);

    } catch (error) {
        console.error('Error in profile update:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Add this route to store comparison data
router.post('/comparisons', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        // Add comparison to user's history
        user.comparisons = user.comparisons || [];
        user.comparisons.push({
            ...req.body,
            date: new Date()
        });

        await user.save();

        res.json({ 
            success: true,
            message: 'Comparison saved successfully'
        });
    } catch (error) {
        console.error('Error saving comparison:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save comparison'
        });
    }
});

export default router; 