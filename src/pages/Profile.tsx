import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

interface UserProfile {
    username: string;
    email: string;
    profile: {
        fullName: string;
        dateOfBirth: string;
        phone: string;
        address: string;
        panCard: string;
        aadharNumber: string;
        occupation: string;
        annualIncome: number;
    };
    createdAt: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Move fetchProfile outside useEffect
    const fetchProfile = async () => {
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

            console.log('Profile response:', response.data);

            if (response.data?.success && response.data?.user) {
                setProfile(response.data.user);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/auth');
            } else {
                setError('Failed to load profile');
            }
        } finally {
            setLoading(false);
        }
    };

    // Use fetchProfile in useEffect
    useEffect(() => {
        fetchProfile();
    }, [navigate]);

    // Now refreshProfile can access fetchProfile
    const refreshProfile = () => {
        setLoading(true);
        fetchProfile();
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!profile) return <div className="error-message">No profile data found</div>;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Profile Details</h1>
                    <div className="profile-actions">
                        <button onClick={refreshProfile} className="refresh-button">
                            Refresh
                        </button>
                        <button onClick={() => navigate('/dashboard')} className="edit-button">
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="profile-section">
                        <h2>Personal Information</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Full Name</label>
                                <p>{profile.profile.fullName}</p>
                            </div>
                            <div className="info-item">
                                <label>Email</label>
                                <p>{profile.email}</p>
                            </div>
                            <div className="info-item">
                                <label>Phone</label>
                                <p>{profile.profile.phone}</p>
                            </div>
                            <div className="info-item">
                                <label>Date of Birth</label>
                                <p>{profile.profile.dateOfBirth}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h2>Identity Details</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>PAN Card</label>
                                <p>{profile.profile.panCard}</p>
                            </div>
                            <div className="info-item">
                                <label>Aadhar Number</label>
                                <p>{profile.profile.aadharNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h2>Professional Information</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Occupation</label>
                                <p>{profile.profile.occupation}</p>
                            </div>
                            <div className="info-item">
                                <label>Annual Income</label>
                                <p>₹{profile.profile.annualIncome.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h2>Address</h2>
                        <p className="address">{profile.profile.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 