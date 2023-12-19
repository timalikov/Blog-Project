import React from 'react'; 
import UserAnalytics from '../../components/Analytics/UserAnalytics';

const AnalyticsPage = () => {
    return (
        <div>
            <h1>Analytics Dashboard</h1>
            <UserAnalytics />
            {/* You can add more analytics components here in the future */}
        </div>
    );
};

export default AnalyticsPage;
