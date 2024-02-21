import React from 'react'

const Course = () => {
    const router = useRouter();
    const { id } = router.query;
  return (
    <div>
      Post "{id}"
    </div>
  )
}

export default Course
