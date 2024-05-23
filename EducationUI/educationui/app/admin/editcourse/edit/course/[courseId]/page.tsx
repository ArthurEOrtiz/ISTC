import EditCourseInfo from "@/app/components/Course/EditCourseInfo";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);

    return (
        <div className='flex justify-center'>
            <EditCourseInfo courseId={courseId}/>
        </div>
  );
}

export default CourseDetail;
