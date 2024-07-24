import CourseCatalog from '@/components/Course/CourseCatalog';
import React from 'react';

const EditCourse: React.FC = async () => {
    return (
        <CourseCatalog isAdmin={true}/>
    );
};

export default EditCourse;
