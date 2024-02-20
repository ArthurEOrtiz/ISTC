export async function getAllCoursesWithClasses() {
    const response = await fetch('https://localhost:7144/course/getAllCoursesWithClasses');
    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}