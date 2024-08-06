import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Course, User } from '@/Utilities/sharedTypes';
import { GetUserEnrolledCoursesById } from '@/Utilities/api';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f8f8f8'
  },
  section: {
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 12,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 12,
    color: '#555',
  },
  coursesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  courseTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 10,
    color: '#555',
  }
});

interface EnrolledCoursesProps {
  user: User;
}

// Create Document Component
const MyDocument: React.FC<EnrolledCoursesProps> = ({ user }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchUserAttendance();
  }, []);

  const fetchUserAttendance = async () => {
    const response = await GetUserEnrolledCoursesById(user.userId);
    if (response.status !== 200) {
      console.error(`There was an error finding courses for this user. ${response}`);
    } else {
      // Sort the courses by enrollmentDeadline
      const sortedCourses = response.data.sort((a: Course, b: Course) => {
        return new Date(a.enrollmentDeadline).getTime() - new Date(b.enrollmentDeadline).getTime();
      });
      const reversedCourses = sortedCourses.reverse();
      setCourses(reversedCourses);
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.userName}>{`${user.firstName} ${user.middleName} ${user.lastName}`}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.coursesHeader}>Enrolled Courses</Text>
          {courses.map((course: Course, index) => (
            <View key={index} style={styles.courseItem}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseDescription}>{course.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;