import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalendarEventsBodyRightDrawer = ({ user_id }) => {
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user_id) {
            handleDetail(user_id);
        }
    }, [user_id]);

    const handleDetail = async (user_id) => {
        try {
            setLoading(true);
            console.log(`Fetching data for user_id: ${user_id}`); // Debug log
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/timeline/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            console.log('API response:', response.data); // Debug log
            if (response.data.success) {
                setEventDetails(response.data.data);
            } else {
                setError('Failed to fetch user timeline details');
            }
        } catch (error) {
            console.error('Error fetching user timeline details:', error);
            setError('Error fetching user timeline details');
        } finally {
            setLoading(false);
        }
    };

    const getAuthToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not available. Please login.");
            return null;
        }
        return token;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!eventDetails) {
        return <div>No event details available</div>;
    }

    return (
        <div>
            <h2>Event Details</h2>
            <p><strong>Name:</strong> {eventDetails.name}</p>
            <p><strong>Date:</strong> {new Date(eventDetails.tanggal).toLocaleDateString()}</p>
            <p><strong>Start Time:</strong> {new Date(`1970-01-01T${eventDetails.start_time}`).toLocaleTimeString()}</p>
            <p><strong>End Time:</strong> {new Date(`1970-01-01T${eventDetails.end_time}`).toLocaleTimeString()}</p>
        </div>
    );
};

export default CalendarEventsBodyRightDrawer;
