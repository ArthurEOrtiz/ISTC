import { Course, User } from "@/Utilities/sharedTypes";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface CourseRosterReportProps {
    course: Course;
    users: User[];
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#f8f8f8'
    },
    section: {
        marginBottom: 20,
    },
    coursesHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    table: {
        display: "flex",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    tableRow: {
        flexDirection: "row",
        fontSize: 10,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        fontSize: 12,

    },
    tableCell: {
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1,
    },
    courseTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    courseDescription: {
        fontSize: 10,
        color: '#555',
    }
});

const CourseRosterReport: React.FC<CourseRosterReportProps> = ({ course, users }) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.coursesHeader}>{course.title} Roster</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Name</Text>
                <Text style={styles.tableCell}>Email</Text>
                <Text style={styles.tableCell}>Employer</Text>
                <Text style={styles.tableCell}>Job Title</Text>
              </View>
              {users.map((user) => (
                <View style={styles.tableRow} key={user.userId}>
                  <Text style={styles.tableCell}>{user.firstName} {user.middleName} {user.lastName}</Text>
                  <Text style={styles.tableCell}>{user.email}</Text>
                  <Text style={styles.tableCell}>{user.employer}</Text>
                  <Text style={styles.tableCell}>{user.jobTitle}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
};

export default CourseRosterReport;