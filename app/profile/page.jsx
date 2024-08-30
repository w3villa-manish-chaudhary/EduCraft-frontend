"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Profile.module.css';
import Img from '../../public/user.jpg';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null); // Initial state is null to indicate loading
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);
    const [error, setError] = useState('');

    const getUserData = async () => {
        try {
            const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            console.log('User data:', userResponse.data.user);
            setUser(userResponse.data.user);
            setUpdatedUser(userResponse.data.user); // Initialize updatedUser with fetched data

        } catch (userError) {
            console.error('Failed to fetch user data:', userError.response?.data || userError.message);
            setError('Failed to fetch user profile. Please try again.');
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateClick = async () => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/updateprofile`, updatedUser, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('User data updated:', response.data);
            setUser(updatedUser); // Update the user state with the updatedUser data
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update user data:', error.response?.data || error.message);
            setError('Failed to update profile. Please try again.');
        }
    };

    if (!user) {
        return <div>Loading...</div>; // Render loading state while fetching data
    }

    return (
        <div className={`container ${styles.profileContainer}`}>
            <div className="row">
                <div className="col-md-4 text-center">
                    <div className={`${styles.profileImgWrapper}`}>
                        <Image
                            src={user.profileImg || Img}
                            alt="Profile Image"
                            className={`${styles.profileImg}`}
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
                <div className="col-md-8">
                    {isEditing ? (
                        <div>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={updatedUser.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={updatedUser.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={updatedUser.address || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mobileNumber"
                                    value={updatedUser.mobileNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={handleUpdateClick}
                            >
                                Update
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className={styles.userName}>{user.name}</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Mobile:</strong> {user.mobileNumber}</p>
                            <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
                            <button
                                className="btn btn-secondary"
                                onClick={handleEditClick}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Profile;
