export default async function CourseDetail ({params}: {
    params: {
        courseId: string
    };
}) {
    return (
        <div>
            <h1>Course Details {params.courseId}</h1>
        </div>
  );
}