import { sendMail } from '@/Utilities/mail';
import CourseCatalog from '../../components/Course/CourseCatalog';
import { User } from '../../Utilities/sharedTypes';

const CoursesPage: React.FC = async () => {
    const sendEmail = async (to: User, subject: string, body: string) => {
        "use server";
        console.log("Sending email to", to.email);
        try {
            await sendMail({
                to,
                subject,
                body
            });
        }
        catch (error) {
            console.error("Error sending email", error);
        }
    }

    return (
        <CourseCatalog isAdmin={false} 
        sendEmail={sendEmail}/>
    );
};

export default CoursesPage;
