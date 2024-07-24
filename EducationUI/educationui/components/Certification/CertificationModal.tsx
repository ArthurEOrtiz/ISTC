import { Certification, CertificationType, Student, User } from "@/Utilities/sharedTypes";
import { useEffect, useState } from "react";
import CertificationList from "./CertificationList";
import { ApproveCertification, DeleteCertification, PostCertificationToUser, RevokeCertification, UpdateStudent } from "@/Utilities/api";
import ConfirmationModal from "@/components/modals/ConfirmationModal";


interface CertificationModalProps {
    adminId: number;
    user: User;
    isOpen: boolean;
    onSubmit: (student: Student) => void;
    onCancel: () => void;
    onError: (message: string) => void;
}

const CertificationModal: React.FC<CertificationModalProps> = ({adminId, user, isOpen, onSubmit, onCancel, onError }) => {
    // States
    const [ reviewedCertifications, setReviewedCertifications ] = useState<Certification[]>([]);
    const [ pendingCertifications, setPendingCertifications ] = useState<Certification[]>([]);
    const [ selectedCertification, setSelectedCertification ] = useState<Certification | null>(null);
    const [ showConfirmationModal, setShowConfirmationModal ] = useState<boolean>(false);
    const [ confirmationMessage, setConfirmationMessage ] = useState<string>("");
    const [ confirmationModalTitle, setConfirmationModalTitle ] = useState<string>("");
    const [ isLoading , setIsLoading ] = useState<boolean>(false);



    // Effects
    useEffect(() => {
        const reviewed = user.student.certifications.filter(cert => cert.approvalDate !== null);
        const pending = user.student.certifications.filter(cert => cert.approvalDate === null);
        setReviewedCertifications(reviewed);
        setPendingCertifications(pending);
    }, [user.student.certifications]);

    // Handlers
    const handleReject = (certification: Certification) => {
        setSelectedCertification(certification);
        setConfirmationModalTitle("Reject Certification");
        setConfirmationMessage("Are you sure you want to reject this certification?");
        setShowConfirmationModal(true);
    };

    const handleRevoked = (certification: Certification) => {
        setSelectedCertification(certification);
        setConfirmationModalTitle("Revoke Certification");
        setConfirmationMessage("Are you sure you want to revoke this certification?");
        setShowConfirmationModal(true);
    };

    const handleDelete = (certification: Certification) => {
        setSelectedCertification(certification);
        setConfirmationModalTitle("Delete Certification");
        setConfirmationMessage("Are you sure you want to delete this certification?");
        setShowConfirmationModal(true);
    }

    const handleConfirmationModalOnConfirm = () => {
        if (!selectedCertification){
            onError('No certification selected.');
        }

        if (selectedCertification && confirmationModalTitle === "Delete Certification") {
            deleteCertification(selectedCertification);
        }

        if (selectedCertification && confirmationModalTitle === "Reject Certification") {
            rejectCertification(selectedCertification);
        }

        if (selectedCertification && confirmationModalTitle === "Revoke Certification") {
            rejectCertification(selectedCertification);
        }

        setSelectedCertification(null);
        setShowConfirmationModal(false);
    }

    // Helpers
    const approveCertification = async (certificationId: number) => {
        setIsLoading(true);
        const response = await ApproveCertification(certificationId, user.student.studentId, adminId);
        if (response.status === 200) {
            const returnedCertification : Certification = response.data
            const updatedCertifications = user.student.certifications.map(cert => {
                if (cert.certificationId === certificationId) {
                    cert = returnedCertification;
                }
                return cert;
            });

            const updatedStudent = { ...user.student, certifications: updatedCertifications };   

            if (returnedCertification.isApproved && returnedCertification.certificationType == 'Mapping') {
                updatedStudent.mappingCertified = true;
            } else if (returnedCertification.isApproved && returnedCertification.certificationType == 'Appraiser') {
                updatedStudent.appraisalCertified = true;
            }

            onSubmit(updatedStudent);
            
        } else {
            onError('Failed to approve certification.');
        }
        setIsLoading(false);
    }

    const deleteCertification = async (certification: Certification) => {
        setIsLoading(true);
        const reponse = await DeleteCertification(certification.certificationId);
        if (reponse.status === 204) {
            const updatedCertifications = user.student.certifications.filter(cert => cert.certificationId !== certification.certificationId);
            const updatedStudent = { ...user.student, certifications: updatedCertifications }; 
            
            if (certification.isApproved && certification.certificationType == 'Mapping') {
                updatedStudent.mappingCertified = false;
            } else if (certification.isApproved && certification.certificationType == 'Appraiser') {
                updatedStudent.appraisalCertified = false;
            }
            
            const updatedStudentResponse = await updateStudent(updatedStudent);
            if (updatedStudentResponse) {
                onSubmit(updatedStudentResponse);
            } 

        } else {
            onError('Failed to delete certification.');
        }
        
        setIsLoading(false);
    }

    const updateStudent = async (student: Student): Promise<Student | null> => {
        const response = await UpdateStudent(student);
        if (response.status === 200) {
            return response.data as Student;
        } else {
            onError('Failed to update student.');
            return null;
        }
    }

    const rejectCertification = async (certification: Certification) => {
        setIsLoading(true);

        const revokedCertification = await revokeCertification(certification);
        
        if (revokedCertification) {
            const updatedCertifications = user.student.certifications.map(cert => {
                if (cert.certificationId === certification.certificationId) {
                    cert = revokedCertification;
                }
                return cert;
            });

            const updatedStudent = { ...user.student, certifications: updatedCertifications };

            if (!revokedCertification.isApproved && revokedCertification.certificationType == 'Mapping') {
                updatedStudent.mappingCertified = false;
            } else if (!revokedCertification.isApproved && revokedCertification.certificationType == 'Appraiser') {
                updatedStudent.appraisalCertified = false;
            }

            onSubmit(updatedStudent);
        }
        setIsLoading(false);
    }

    const revokeCertification = async (certification: Certification): Promise<Certification | null> => {
        const response = await RevokeCertification(certification.certificationId, user.student.studentId, adminId);
        if (response.status === 200) {
            return response.data as Certification;
        } else {
            onError('Failed to revoke certification.');
            return null;
        }
    }

    const certifyStudent = async (certificationType: CertificationType) => {
        setIsLoading(true);
        
        // Check for existing certification
        const existingCertification = user.student.certifications.find(cert => cert.certificationType === certificationType);
        if (existingCertification) {
            const errorMessage = existingCertification.isApproved
                ? `Student is already certified as ${certificationType}.`
                : `Student has a pending certification as ${certificationType}. Please review the certification and approve or reject.`;
            onError(errorMessage);
            setIsLoading(false);
            return;
        }

        // Create new certification
        const newCertification: Certification = {
            certificationId: 0,
            certificationType,
            requestDate: new Date(),
            approvalDate: new Date(),
            isApproved: true,
            approvedBy: adminId,
        };

        // Post new certification
        try {
            const response = await PostCertificationToUser(user.userId, newCertification);
            if (response.status === 201) {
                const returnedCertification : Certification = response.data;
                const updatedCertifications : Certification [] = [...user.student.certifications, returnedCertification];
                const updatedStudent = { ...user.student, certifications: updatedCertifications }; 
                if (certificationType === 'Mapping') {
                    updatedStudent.mappingCertified = true;
                }
                if (certificationType === 'Appraiser') {
                    updatedStudent.appraisalCertified = true;
                }
                const updatedStudentResponse = await updateStudent(updatedStudent);
                if (updatedStudentResponse) {
                    onSubmit(updatedStudentResponse);
                } 
            } else {
                throw new Error('Failed to certify student.');
            }
        } catch (error: any) {
            onError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const certifyAsMapper = () => certifyStudent('Mapping');
    const certifyAsAppraiser = () => certifyStudent('Appraiser');

    // Render
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 p-8 rounded-lg z-50 w-1/2">
                {/*Header*/}
                <div className="flex items-baseline justify-between mb-2">
                    <h2 className="text-2xl font-semibold mb-4">Certification</h2>
                    <button onClick={onCancel} className="text-3xl text-error font-bold">&times;</button>
                </div>
                {/*Body*/}
                <div>
                    {/* Pending Certifications */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Pending Certifications</h2>
                        <CertificationList
                            certifications={pendingCertifications} 
                            type='pending'
                            onApprove={(certificationId) => approveCertification(certificationId)}
                            onReject={(certification) => handleReject(certification)}
                        />
                    </div>
                    {/* Reviewed Certifications */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Reviewed Certifications</h2>
                        <CertificationList 
                            certifications={reviewedCertifications} 
                            type='reviewed' 
                            onApprove={(certificationId) => approveCertification(certificationId)}
                            onRevoked={(certification) => handleRevoked(certification)}
                            onDelete={(certification) => handleDelete(certification)}
                        />
                    </div>
                </div>
                {/*Footer*/}
                <div className="flex space-x-2">
                    <button 
                        className="btn btn-success text-white"
                        disabled={user.student.mappingCertified}
                        onClick={certifyAsMapper}
                    >
                        Certify As Mapper
                    </button>
                    <button 
                        className="btn btn-success text-white"
                        disabled={user.student.appraisalCertified}
                        onClick={certifyAsAppraiser}  
                    >
                        Certify As Appraiser
                    </button>
                    <button onClick={onCancel} className="btn btn-error text-white">Close</button>
                    {isLoading && <span className="loading loading-spinner loading-lg"></span>}
                </div>
            </div>

            {showConfirmationModal && (
                <ConfirmationModal
                    title={confirmationModalTitle}
                    message={confirmationMessage}
                    isOpen={showConfirmationModal}
                    onConfirm={handleConfirmationModalOnConfirm}
                    onCancel={() => setShowConfirmationModal(false)}
                />
            )}
        </div>
    );
};

export default CertificationModal;