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

export async function getCourseById(courseId) {
    try {
        const response = await axiosInstance.get(`Course/GetCourseById?id=${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
}

export async function postCourse(course) {
    try {
        const response = await axiosInstance.post('Course/PostCourse', course);
        return response.data;
    } catch (error) {
        console.error('Error posting course:', error);
        throw error;
    }
}

export async function UpdateCourseById(courseId, course) {
    try {
        const response = await axiosInstance.put(`Course/UpdateCourseById/${courseId}`, course);
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
}

export async function DeleteCourseById(courseId) {
    try {
        const response = await axiosInstance.delete(`Course/DeleteCourseById/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
}

// Class
export async function AddClassByCourseId(courseId, scheduleStart, scheduleEnd)
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

export async function EditClassById (classId, scheduleStart, scheduleEnd) {
    try {
        const url = `Class/EditClassById?id=${classId}&newScheduleStart=${scheduleStart}&newScheduleStop=${scheduleEnd}`;

        const response = await axiosInstance.post(url);
        return response.data;
    } catch (error) {
        console.error('Error editing class:', error);
        throw error;
    }
}

export async function DeleteClassById(classId) {
    try {
        const response = await axiosInstance.delete(`Class/DeleteClassById?id=${classId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting class:', error);
        throw error;
    }
}

// Topics
export async function getAllTopics() {
    try {
        const response = await axiosInstance.get('Topic/GetAllTopics');
        return response.data;
    } catch (error) {
        console.error('Error fetching topics:', error);
        throw error;
    }
}



