import { CourseFormData } from "@/app/shared/types/sharedTypes";

interface CourseCardProps {
    courseFormData: CourseFormData | null;  
};


const CourseCard : React.FC<CourseCardProps> = ({courseFormData}) => {
    return(
        <div className="bg-white shadow-md rounded-md p-4">
            <h1 className="text-2xl font-bold">{courseFormData?.title}</h1>
            <p>{courseFormData?.description}</p>
            <p>{courseFormData?.instructorName}</p>
            <p>{courseFormData?.instructorEmail}</p>
            <p>{courseFormData?.attendanceCredit}</p>
            <p>{courseFormData?.completionCredit}</p>
            <p>{courseFormData?.maxAttendance}</p>
            <p>{courseFormData?.enrollmentDeadline}</p>
            <p>{courseFormData?.pdf}</p>
            <p>{courseFormData?.locationDescription}</p>
            <p>{courseFormData?.room}</p>
            <p>{courseFormData?.remoteLink}</p>
            <p>{courseFormData?.addressLine1}</p>
            <p>{courseFormData?.addressLine2}</p>
            <p>{courseFormData?.city}</p>
            <p>{courseFormData?.state}</p>
            <p>{courseFormData?.postalCode}</p>
        </div>
    );
}

export default CourseCard;