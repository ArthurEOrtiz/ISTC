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
    try {
        const url = `https://localhost:7144/Course/GetCourseById?id=${courseId}`;
        const httpAgent = new https.Agent({ rejectUnauthorized: false });
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'text/plain'
            },
            agent: httpAgent,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch course');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
}
