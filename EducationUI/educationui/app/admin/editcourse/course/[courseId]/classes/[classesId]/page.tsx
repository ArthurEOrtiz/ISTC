export default function ClassDetail({params}: {
    params: {
        courseId: string,
        classesId: string
    };

}) {
    return (
        <div>
            <h1>Class Details {params.classesId} of Course {params.courseId}</h1>
        </div>
  );
}
