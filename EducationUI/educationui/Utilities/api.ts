import { Attendance, Course, Topic, User, WaitList } from '@/app/shared/types/sharedTypes';
import axios from 'axios';
import https from 'https';


const baseUrl = 'https://localhost:7144/';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // This line is for handling self-signed certificates, remove if not needed
    headers: {
        'Accept': 'application/json',
    },
});

// Attendance
export async function UpdateAttendace(attendance: Attendance) {
    try {
        const response = await axiosInstance.put('Attendance/UpdateAttendance', attendance);
        return response;
    } catch (error: any) {
        console.error('Error updating attendance:', error);
        return error.response.data;
    }
}

export async function UpdateAttendanceById(attendanceId: Number, attended: Boolean) {
    try {
        const response = await axiosInstance.put(`Attendance/UpdateAttendanceById/${attendanceId}/${attended}`);
        return response;
    } catch (error: any) {
        console.error('Error updating attendance:', error);
        return error.message;
    }
}

export async function CalculateStudentCreditHours(studentId: Number) {
    try {
        const response = await axiosInstance.put(`Attendance/CalculateStudentCreditHours/${studentId}`);
        return response;
    } catch (error: any) {
        console.error('Error calculating student credit hours:', error);
        return error.message;
    }
}

// Courses 
export async function getAllCourses() {
    try {
        const response = await axiosInstance.get('Course/GetAllCourses');
        return response;
    } catch (error : any) {
        console.error('Error fetching courses:', error);
        return error.message;
    }
}

export async function GetAllEnrollableCourses() {
    try {
        const response = await axiosInstance.get('Course/GetAllEnrollableCourses');
        return response;
    } catch (error : any) {
        console.error('Error fetching courses:', error);
        throw error.message;
    }
}

export async function getCourseById(courseId: number) {
    try {
        const response = await axiosInstance.get(`Course/GetCourseById?id=${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
}

export async function getCoursesByTopicId(topicId: number) {
    try {
        const response = await axiosInstance.get(`Course/GetCoursesByTopicId/${topicId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

export async function getCoursesByDateRange(startDate: string, endDate: string) {
    try {
        const response = await axiosInstance.get(`Course/GetCoursesByDateRange?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

export async function GetCourseEnrollment(courseId: Number) {
    try {
        const response = await axiosInstance.get(`Course/GetCourseEnrollment/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching course enrollment:', error);
        return error.message;
    }
}

export async function GetUserEnrolledCoursesById(userId: Number) {
    try {
        const response = await axiosInstance.get(`Course/GetUserEnrolledCoursesById/${userId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching courses:', error);
        return error.message;
    }
}

export async function postCourse(course: Course) {
    try {
        const response = await axiosInstance.post('Course/PostCourse', course);
        return response
    } catch (error : any) {
        console.error('Error posting course:', error);
        return error.message;
    }
}

export async function UpdateCourse(course: Course) {
    try {
        const response = await axiosInstance.put('Course/UpdateCourse/', course);
        return response;
    } catch (error : any) {
        console.error('Error updating course:', error);
        return error.response.data;
    }
}

export async function EnrollUser(userId: Number, courseId: Number) {
    try {
        const response = await axiosInstance.post(`Course/EnrollUser/${userId}/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error enrolling user:', error);
        return error.message;
    }
}

export async function EnrollUsers(courseId: Number, users: User[]) {

    const userIds = users.map((user: User) => user.userId);

    try {
        const response = await axiosInstance.post(`Course/EnrollUsers/${courseId}`, userIds);
        return response;
    } catch (error: any) {
        console.error('Error enrolling users:', error);
        return error.response.data;
    }
}

export async function DropUser(userId: Number, courseId: Number) {
    try {
        const response = await axiosInstance.delete(`Course/DropUser/${userId}/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error dropping user:', error);
        return error.message;
    }
}

export async function DropUsers(courseId: Number, users: User[]) {

    const userIds = users.map((user: User) => user.userId);

    try {
        const response = await axiosInstance.post(`Course/DropUsers/${courseId}`, userIds);
        return response;
    } catch (error: any) {
        console.error('Error dropping users:', error);
        return error.message;
    }
}

export async function DeleteCourseById(courseId: Number) {
    try {
        const response = await axiosInstance.delete(`Course/DeleteCourseById/${courseId}`);
        return response;
    } catch (error : any) {
        console.error('Error deleting course:', error);
        return error.response.data;
    }
}

// Class
export async function AddClassByCourseId(courseId: Number, scheduleStart: string, scheduleEnd: string)
{
    try {
        const url = `Class/AddClassByCourseId?courseId=${courseId}&newStartDate=${scheduleStart}&newEndDate=${scheduleEnd}`;

        const response = await axiosInstance.post(url);
        return response;
    } catch (error: any) {
        console.error('Error adding class:', error);
        throw error.message;
    }
}

export async function GetClassesByCourseId(courseId: Number) {
    try {
        const response = await axiosInstance.get(`Class/GetClassesByCourseId/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching classes:', error);
        return error.message;
    }
}

export async function EditClassById (classId: Number, scheduleStart: string, scheduleEnd: string) {
    try {
        const url = `Class/EditClassById?id=${classId}&newScheduleStart=${scheduleStart}&newScheduleStop=${scheduleEnd}`;
        const response = await axiosInstance.post(url);
        return response;
    } catch (error: any) {
        console.error('Error editing class:', error);
        throw error.message;
    }
}

export async function DeleteClassById(classId: Number) {
    try {
        const response = await axiosInstance.delete(`Class/DeleteClassById?id=${classId}`);
        return response;
    } catch (error: any) {
        console.error('Error deleting class:', error);
        throw error.message;
    }
}

// Topics

export async function postTopic(topic: Topic) {
    try {
        const response = await axiosInstance.post('Topic/PostTopic', topic);
        return response.data;
    } catch (error) {
        console.error('Error posting topic:', error);
        throw error;
    }
}
export async function getAllTopics() {
    try {
        const response = await axiosInstance.get('Topic/GetAllTopics');
        return response;
    } catch (error: any) {
        console.error('Error fetching topics:', error);
        return error.message;
    }
}

export async function updateTopicById(topicId: Number, topic: Topic) {
    try {
        const response = await axiosInstance.put(`Topic/UpdateTopicById/${topicId}`, topic);
        return response.data;
    } catch (error) {
        console.error('Error updating topic:', error);
        throw error;
    }
}

export async function deleteTopicById(topicId: Number) {
    try {
        const response = await axiosInstance.delete(`Topic/DeleteTopicById/${topicId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting topic:', error);
        throw error;
    }
}

// Users

export async function getAllUsers() {
    try {
        const response = await axiosInstance.get('User/GetAllUsers');
        return response;
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return error.message;
    }
}

export async function SearchUsers(searchString: string) {
    try {
        const response = await axiosInstance.get(`User/SearchUsers/${searchString}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return error.message;
    }
}

export async function GetUserById(userId: Number) {
    try {
        const response = await axiosInstance.get(`User/GetUserById/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export async function GetUserByEmail(email: string) {
    try {
        const response = await axiosInstance.get(`User/GetUserByEmail/${email}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching user:', error);
        return error.message;
    }
}

export async function GetUserByClerkId(clerkId: String) {
    try {
        const response = await axiosInstance.get(`User/GetUserByClerkId/${clerkId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching user:', error);
        return error.message;
    }
}

export async function PostUser(user: User) {
    try {
        const response = await axiosInstance.post('User/PostUser', user);
        return response;
    } catch (error: any) {
        console.error('Error posting user:', error);
        return error.message;
    }
}

export async function UpdateUserContact(user: User) {
    try {
        const response = await axiosInstance.put('User/UpdateUserContact', user);
        return response;
    } catch (error: any) {
        console.error('Error updating user:', error);
        return error.message;
    }
}

export async function UpdateUser(user: User) {
    try {
        const response = await axiosInstance.put('User/UpdateUser', user);
        return response;
    } catch (error: any) {
        console.error('Error updating user:', error);
        return error.message;
    }
}

export async function checkUserExistsByClerkId(clerkId: String) {
    try {
        const response = await axiosInstance.get(`User/CheckUserExistsByClerkId/${clerkId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export async function CheckUserExistsByEmail(string: string){
    try {
        const response = await axiosInstance.get(`User/CheckUserExistsByEmail/${string}`);
        return response
    } catch (error: any) {
        console.error('Error fetching user:', error);
        return error.message;
    }
}

export async function IsUserAdminByClerkId(clerkId: String) {
    try {
        const response = await axiosInstance.get(`User/IsUserAdminByClerkId/${clerkId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export async function IsUserEnrolledInCourse(clerkId: String, courseId: Number) {
    try {
        const response = await axiosInstance.get(`User/IsUserEnrolledInCourse/${clerkId}/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching user:', error);
        return error.message;
    }
}

export async function GetUserByStudentId(studentId: Number) {
    try {
        const response = await axiosInstance.get(`User/GetUserByStudentId/${studentId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching user:', error);
        return error.message;
    }
}

export async function DeleteUserById(userId: Number) {
    try {
        const response = await axiosInstance.delete(`User/DeleteUserById/${userId}`);
        return response;
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return error.message;
    }
}

//Students

export async function GetStudentAttendanceById(studentId: Number) {
    try {
        const response = await axiosInstance.get(`Student/GetStudentAttendanceById/${studentId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching student attendance:', error);
        throw error.message;
    }
}

export async function getStudentIdByClerkId(clerkId: String) {
    try {
        const response = await axiosInstance.get(`Student/GetStudentIdByClerkId/${clerkId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching user:', error);
        throw error.message;
    }
}

// WaitList

export async function GetAllWaitList() {
    try {
        const response = await axiosInstance.get('WaitList/GetAllWaitList');
        return response;
    } catch (error: any) {
        console.error('Error fetching waitlist:', error);
        return error.message;
    }
}

export async function GetWaitListById(waitListId: Number) {
    try {
        const response = await axiosInstance.get(`WaitList/GetWaitListById/${waitListId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching waitlist:', error);
        return error.message;
    }
}

export async function PostWaitList(waitList: WaitList) {
    try {
        const response = await axiosInstance.post('WaitList/PostWaitList', waitList);
        return response;
    } catch (error: any) {
        console.error('Error posting waitlist:', error);
        return error.message;
    }
}

export async function UpdateWaitList(waitList: WaitList) {
    try {
        const response = await axiosInstance.put('WaitList/UpdateWaitList', waitList);
        return response;
    } catch (error: any) {
        console.error('Error updating waitlist:', error);
        return error.message;
    }
}

export async function DeleteWaitListById(waitListId: Number) {
    try {
        const response = await axiosInstance.delete(`WaitList/DeleteWaitListById/${waitListId}`);
        return response;
    } catch (error: any) {
        console.error('Error deleting waitlist:', error);
        return error.message;
    }
}

export async function DeleteWaitListByUserIdCourseId(userId: Number, courseId: Number) {
    try {
        const response = await axiosInstance.delete(`WaitList/DeleteWaitListByUserIdCourseId/${userId}/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error deleting waitlist:', error);
        return error.message;
    }
}

export async function IsUserWaitListed(courseId: Number, userId: Number) {
    try {
        const response = await axiosInstance.get(`WaitList/IsUserWaitListed/${courseId}/${userId}`);
        return response;
    } catch (error: any) {
        console.error('Error checking waitlist:', error);
        return error.message;
    }
}

export async function GetCourseWaitList(courseId: Number) {
    try {
        const response = await axiosInstance.get(`WaitList/GetCourseWaitList/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching waitlist:', error);
        return error.message;
    }
}

export async function GetWaitListByUserIdCourseId(userId: Number, courseId: Number) {
    try {
        const response = await axiosInstance.get(`WaitList/GetWaitListByUserIdCourseId/${userId}/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching waitlist:', error);
        return error.message;
    }
}

export async function GetEnrollmentQueue(courseId: Number) {
    try {
        const response = await axiosInstance.get(`WaitList/GetEnrollmentQueue/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching waitlist:', error);
        return error.message;
    }
}

export async function GetDropQueue(courseId: Number) {
    try {
        const response = await axiosInstance.get(`WaitList/GetDropQueue/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error fetching waitlist:', error);
        return error.message;
    }
}

// PDF

export async function DownloadPDF(pdfId: Number) {
    try {
        const response = await axiosInstance.get(`PDF/DownloadPDF/${pdfId}`);
        return response;
    } catch (error: any) {
        console.error('Error downloading PDF:', error);
        return error.message;
    }
}
