"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';
import styles from './Profile.module.css';
import Img from '../../public/user.jpg';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

    const getUserData = async () => {
        try {
            const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            console.log('User data:', userResponse.data.user);
            setUser(userResponse.data.user);
            setUpdatedUser(userResponse.data.user);

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

        if (name === 'address') {
            setQuery(value);
            fetchSuggestions(value);
        }
    };

    const fetchSuggestions = async (query) => {
        if (!query) return;
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&countrycode=in`);
            setSuggestions(response.data.results);
        } catch (err) {
            console.error('Failed to fetch location suggestions:', err);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedLocation(suggestion.geometry);
        setUpdatedUser({ ...updatedUser, address: suggestion.formatted });
        setSuggestions([]);
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
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update user data:', error.response?.data || error.message);
            setError('Failed to update profile. Please try again.');
        }
    };

    // New function to generate and download the PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Add user details to the PDF
        doc.text(`Name: ${user.name}`, 10, 10);
        doc.text(`Email: ${user.email}`, 10, 20);
        doc.text(`Mobile: ${user.mobileNumber}`, 10, 30);
        doc.text(`Address: ${user.address}`, 10, 40);

        // Download the PDF
        doc.save(`${user.name}-details.pdf`);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`container ${styles.profileContainer}`}>
            <div className="row mt-5">
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
                                {suggestions.length > 0 && (
                                    <ul className="list-group">
                                        {suggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                className="list-group-item"
                                                onClick={() => handleSuggestionClick(suggestion)}
                                            >
                                                {suggestion.formatted}
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
                            {selectedLocation && (
                                <iframe
                                    className={styles.mapIframe}
                                    width="100%"
                                    height="300"
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedLocation.lng - 0.01},${selectedLocation.lat - 0.01},${selectedLocation.lng + 0.01},${selectedLocation.lat + 0.01}&layer=mapnik`}
                                    frameBorder="0"
                                    allowFullScreen

                                ></iframe>
                            )}
                            <button
                                className="btn btn-secondary"
                                onClick={handleEditClick}
                            >
                                Edit Profile
                            </button>

                            <button
                                className="btn btn-success ms-2"
                                onClick={handleDownloadPDF}
                            >
                                Download User Details
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
