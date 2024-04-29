import CourseCatalog from '../components/Course/CourseCatalog';

const CoursesPage: React.FC = async () => {
    return (
        <CourseCatalog isAdmin={false} />
   
    );
};

export default CoursesPage;
