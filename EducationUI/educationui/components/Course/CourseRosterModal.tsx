import { GetCourseEnrollment } from "@/Utilities/api";
import { Course, User } from "@/Utilities/sharedTypes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import CourseRosterReport from "../Reports/CourseRosterReport";

interface CourseRosterModalProps {
    course: Course;
    visible: boolean;
    onClose: () => void;
    onError: (error: string) => void;   
}

const CourseRosterModal: React.FC<CourseRosterModalProps> = ({ course, visible, onClose, onError }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            getCourseEnrollment();
        }
    }, [visible]);

    const getCourseEnrollment = async () => {
        setLoading(true);
        const response = await GetCourseEnrollment(course.courseId);
        if (response.status !== 200) {
            onError('There was an error fetching course enrollment.');
        } else {
            setUsers(response.data);
        }
        setLoading(false);
    }


    return (
        <div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${visible ? 'block' : 'hidden'}`}></div>
            <div className={`fixed inset-0 z-50 flex justify-center items-center ${visible ? 'block' : 'hidden'}`}>
                <div className="bg-base-100 w-1/2 p-4 rounded-xl">
                    <div className="flex items-baseline justify-between mb-2">
                        <h1 className="text-2xl font-bold">Course Roster</h1>
                        <button onClick={onClose} className="text-3xl text-error font-bold">&times;</button>
                    </div>
                    <div>
                        {loading && (
                            <div className="flex justify-center items-center h-32">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        )}
                        {!loading && users.length === 0 && <p>No users enrolled in this course.</p>}
                        {!loading && users.length > 0 && users.map((user) => (
                            <div key={user.userId} className="bg-base-300 rounded-xl p-4 my-2 shadow-md flex flex-col space-y-1">
                            <p className="text-lg font-semibold">
                                {user.firstName} {user.middleName} {user.lastName}
                            </p>
                            <p className="text-sm">
                                {user.email}
                            </p>
                            <p className="text-sm">
                                {user.employer} - {user.jobTitle}
                            </p>
                        </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                        {users.length > 0 && (
                            <PDFDownloadLink 
                                document={<CourseRosterReport course={course} users={users} />} 
                                fileName={`${course.title.replace(/\s+/g, '')}_Roster_${new Date().toDateString().replace(/\s+/g, '')}`}
                                className="btn btn-success text-white">
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                            </PDFDownloadLink> 
                        )}
                        
                        <button onClick={onClose} className="btn btn-error text-white">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CourseRosterModal;