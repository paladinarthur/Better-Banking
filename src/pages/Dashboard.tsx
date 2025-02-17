import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

interface UserDetails {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    panCard: string;
    aadharNumber: string;
    occupation: string;
    annualIncome: string;
}

const Dashboard = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        panCard: '',
        aadharNumber: '',
        occupation: '',
        annualIncome: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/auth');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/user/details', {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data?.success && response.data?.user?.profile) {
                    const { profile, email } = response.data.user;
                    setUserDetails({
                        fullName: profile.fullName || '',
                        email: email || '',
                        phone: profile.phone || '',
                        address: profile.address || '',
                        dateOfBirth: profile.dateOfBirth || '',
                        panCard: profile.panCard || '',
                        aadharNumber: profile.aadharNumber || '',
                        occupation: profile.occupation || '',
                        annualIncome: profile.annualIncome?.toString() || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/auth');
                } else {
                    setError('Failed to load user details');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/auth');
                return;
            }

            const formattedData = {
                profile: {
                    fullName: userDetails.fullName.trim(),
                    dateOfBirth: userDetails.dateOfBirth,
                    phone: userDetails.phone.trim(),
                    address: userDetails.address.trim(),
                    panCard: userDetails.panCard.trim(),
                    aadharNumber: userDetails.aadharNumber.trim(),
                    occupation: userDetails.occupation,
                    annualIncome: Number(userDetails.annualIncome)
                }
            };

            const response = await axios.post(
                'http://localhost:5000/api/user/details',
                formattedData,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data?.success) {
                setSuccess('Profile updated successfully!');
                // Show success message for a moment before redirecting
                await new Promise(resolve => setTimeout(resolve, 1500));
                navigate('/profile');
            } else {
                throw new Error(response.data?.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to update profile');
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="welcome-section">
                <h1>Your Profile</h1>
                <p>Manage your personal information</p>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name (as per PAN Card)</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={userDetails.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit mobile number"
                        pattern="[0-9]{10}"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={userDetails.dateOfBirth}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="panCard">PAN Card Number</label>
                    <input
                        type="text"
                        id="panCard"
                        name="panCard"
                        value={userDetails.panCard}
                        onChange={handleInputChange}
                        placeholder="ABCDE1234F"
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="aadharNumber">Aadhar Number</label>
                    <input
                        type="text"
                        id="aadharNumber"
                        name="aadharNumber"
                        value={userDetails.aadharNumber}
                        onChange={handleInputChange}
                        placeholder="12-digit Aadhar number"
                        pattern="[0-9]{12}"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Current Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete address"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="occupation">Occupation</label>
                    <select
                        id="occupation"
                        name="occupation"
                        value={userDetails.occupation}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Occupation</option>
                        <option value="salaried">Salaried</option>
                        <option value="self-employed">Self Employed</option>
                        <option value="business">Business Owner</option>
                        <option value="student">Student</option>
                        <option value="retired">Retired</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="annualIncome">Annual Income</label>
                    <input
                        type="number"
                        id="annualIncome"
                        name="annualIncome"
                        value={userDetails.annualIncome}
                        onChange={handleInputChange}
                        placeholder="Enter annual income in ₹"
                        min="0"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Dashboard;