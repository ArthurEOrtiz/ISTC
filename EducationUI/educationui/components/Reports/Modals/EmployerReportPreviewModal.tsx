import { GetUserEnrollment } from "@/Utilities/api";
import { EmployerUserDTO } from "@/Utilities/dtoTypes";
import { useEffect, useState } from "react";

interface EmployerReportPreviewModalProps {
    formData: {
        startDate: string;
        endDate: string;
        employer: string;
    };
    visible: boolean;
    onClose: () => void;
}

const EmployerReportPreviewModal: React.FC<EmployerReportPreviewModalProps> = ({ formData, visible, onClose }) => {
   
    const [loading, setLoading] = useState(false);
    const [employerUserDto, setEmployerUserDto] = useState<EmployerUserDTO>({} as EmployerUserDTO);

    useEffect(() => {
        if (visible) {
            getUserEnrollment();
        }
    }, [visible]);

    const getUserEnrollment = async () => { 
        setLoading(true);
        const response = await GetUserEnrollment(formData.employer, formData.startDate, formData.endDate);
        if (response.status !== 200) {
            console.log('There was an error fetching user enrollment.');
        } else {
            setEmployerUserDto(response.data);
        }
        setLoading(false);
    }
    
    return (
        <div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${visible ? 'block' : 'hidden'}`}></div>
            <div className={`fixed inset-0 z-50 flex justify-center items-center ${visible ? 'block' : 'hidden'}`}>
                <div className="bg-base-100 w-7/8 p-4 rounded-xl">
                    <div className="flex items-baseline justify-between mb-2">
                        <h1 className="text-2xl font-bold">Employer Report Preview</h1>
                        <button onClick={onClose} className="text-3xl text-error font-bold">&times;</button>
                    </div>
                    <div>
                        {loading && (
                            <div className="flex justify-center items-center h-32">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        )}
                        {!loading && employerUserDto?.users?.length === 0 && <p>No users with this employer.</p>}
                        {!loading && employerUserDto?.users?.length > 0 && employerUserDto.users.map((user) => (
                            <div className="overflow-x-autobg-base-200 rounded-xl">
                                <table className="table w-full">
                                    <thead className="bg-base-300">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Employer</th>
                                            <th>Job Title</th>
                                            <th>Courses</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={user.user.userId}>
                                            <td>{user.user.firstName} {user.user.middleName} {user.user.lastName}</td>
                                            <td>{user.user.email}</td>
                                            <td>{user.user.employer}</td>
                                            <td>{user.user.jobTitle}</td>
                                            <td className="overflow-y-auto max-h-32">
                                                <ul className="list-disc pl-5">
                                                    {user.courses.map(course => (
                                                        <li key={course.courseId}>{course.title}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button className="btn btn-success text-white">Export to PDF</button>
                        <button onClick={onClose} className="btn btn-error text-white">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EmployerReportPreviewModal;
    