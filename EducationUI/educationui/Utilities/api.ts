import { Course, Topic, User } from '@/app/shared/types/sharedTypes';
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

// Courses 
export async function getAllCourses() {
    try {
        const response = await axiosInstance.get('Course/GetAllCourses');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
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

export async function postCourse(course: Course) {
    try {
        const response = await axiosInstance.post('Course/PostCourse', course);
        return response.data;
    } catch (error) {
        console.error('Error posting course:', error);
        throw error;
    }
}

export async function UpdateCourseById(courseId: Number, course: Course) {
    try {
        const response = await axiosInstance.put(`Course/UpdateCourseById/${courseId}`, course);
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
}

export async function EnrollStudentByClerkId(clerkId: String, courseId: Number){
    try {
        const response = await axiosInstance.post(`Course/EnrollStudentByClerkId/${clerkId}/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error enrolling student:', error);
        return error.response;
    }
}

export async function UnenrollStudentByClerkId(clerkId: String, courseId: Number){
    try {
        const response = await axiosInstance.delete(`Course/UnenrollStudentByClerkId/${clerkId}/${courseId}`);
        return response;
    } catch (error: any) {
        console.error('Error enrolling student:', error);
        return error.response;
    }
}

export async function DeleteCourseById(courseId: Number) {
    try {
        const response = await axiosInstance.delete(`Course/DeleteCourseById/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
}

// Class
export async function AddClassByCourseId(courseId: Number, scheduleStart: Date, scheduleEnd: Date)
{
    try {
        const url = `Class/AddClassByCourseId?courseId=${courseId}&newStartDate=${scheduleStart}&newEndDate=${scheduleEnd}`;

        const response = await axiosInstance.post(url);
        return response.data;
    } catch (error) {
        console.error('Error adding class:', error);
        throw error;
    }
}

export async function EditClassById (classId: Number, scheduleStart: Date, scheduleEnd: Date) {
    try {
        const url = `Class/EditClassById?id=${classId}&newScheduleStart=${scheduleStart}&newScheduleStop=${scheduleEnd}`;

        const response = await axiosInstance.post(url);
        return response.data;
    } catch (error) {
        console.error('Error editing class:', error);
        throw error;
    }
}

export async function DeleteClassById(classId: Number) {
    try {
        const response = await axiosInstance.delete(`Class/DeleteClassById?id=${classId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting class:', error);
        throw error;
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
        return response.data;
    } catch (error) {
        console.error('Error fetching topics:', error);
        throw error;
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
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
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
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export async function getStudentIdByClerkId(clerkId: String) {
    try {
        const response = await axiosInstance.get(`User/GetStudentIdByClerkId/${clerkId}`);
        return response;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
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