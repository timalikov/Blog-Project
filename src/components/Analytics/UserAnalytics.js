import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        usersByProfession: {},
        totalStaffUsers: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users/analytics/');
                setAnalytics(response.data);
            } catch (error) {
                console.error('Error fetching user analytics data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>User Analytics</h2>
            <p>Total Users: {analytics.totalUsers}</p>
            <p>Active Users: {analytics.activeUsers}</p>
            <p>Inactive Users: {analytics.inactiveUsers}</p>
            <p>Total Staff Users: {analytics.totalStaffUsers}</p>
            <h3>Users by Profession:</h3>
            <ul>
                {Object.entries(analytics.usersByProfession).map(([profession, count]) => (
                    <li key={profession}>{profession}: {count}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserAnalytics;
