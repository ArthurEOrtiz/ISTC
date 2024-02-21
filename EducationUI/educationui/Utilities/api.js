import https from 'https';
import fetch from 'node-fetch';

export async function getAllCoursesWithClasses() {
    const url = 'https://localhost:7144/Course/GetAllCoursesWithClasses';
    const httpAgent = new https.Agent({ rejectUnauthorized: false});
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'text/plain'},
        agent: httpAgent,
    });

    return response.json();
}

export async function getCourseById(courseId) {
    const url = `https://localhost:7144/Course/GetCourseById/${courseId}`;
    const httpAgent = new https.Agent({ rejectUnauthorized: false});
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'text/plain'},
        agent: httpAgent,
    });

    return response.json();
}