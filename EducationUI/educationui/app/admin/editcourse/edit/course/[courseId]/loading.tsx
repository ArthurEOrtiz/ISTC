import React from 'react';

const LoadingCourse: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <h1>Loading Course...</h1>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        </div>
    );
};

export default LoadingCourse;