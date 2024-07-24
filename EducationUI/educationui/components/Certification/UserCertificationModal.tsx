import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { Certification, CertificationType } from "@/Utilities/sharedTypes";
import { DeleteCertification, PostCertificationToUser } from "@/Utilities/api";
import { formatToMountainTime } from "@/Utilities/dateTime";
import { useState } from "react";

interface UserCertificationModalProps {
    userId: number; 
    certifications: Certification[];
    isOpen: boolean;
    onSubmit: (certifications: Certification[]) => void;
    onCancel: () => void;
    onError: (message: string) => void;
}

const UserCertificationModal: React.FC<UserCertificationModalProps> = ({userId, certifications, isOpen, onSubmit, onCancel, onError }) => {

    const [ isLoading , setIsLoading ] = useState<boolean>(false);
    const [ certToDelete, setCertToDelete ] = useState<number | null>(null);
    const [ showConfirmationModal, setShowConfirmationModal ] = useState<boolean>(false);
    const [ confirmationMessage, setConfirmationMessage ] = useState<string>("");
    const [ confirmationModalTitle, setConfirmationModalTitle ] = useState<string>("");
    
    const mappingApplication: Certification = {
        certificationId: 0,
        certificationType: "Mapping" as CertificationType,
        requestDate: new Date(),
        approvalDate: null,
        isApproved: false,
        approvedBy: null,
    };

    const appraisalApplication: Certification = {
        certificationId: 0,
        certificationType: "Appraiser" as CertificationType,
        requestDate: new Date(),
        approvalDate: null,
        isApproved: false,
        approvedBy: null,
    };
    // Handlers

    const handleDeleteCertification = (certificationId: number) => {
        setCertToDelete(certificationId);
        setConfirmationModalTitle("Delete Certification");
        setConfirmationMessage("Are you sure you want to delete this certification?");
        setShowConfirmationModal(true);
    };

    const handleConfirmationModalOnConfirm = () => {
        if (certToDelete && confirmationModalTitle === "Delete Certification") {
            deleteCertification(certToDelete);
        }
        setShowConfirmationModal(false);
    }

    // Helpers
    const postCertificationToUser = async (certification: Certification) => {
        setIsLoading(true);
        const response = await PostCertificationToUser(userId, certification);
        if (response.status === 201) {
            const returnedCertification : Certification = response.data;
            const updatedCertifications : Certification [] = [...certifications, returnedCertification];
            //console.log(updatedCertifications);
            onSubmit(updatedCertifications);
        } else {
            onError(response);
        }
        setIsLoading(false);
    };

    const deleteCertification = async (certificationId: number) => {
        setIsLoading(true);
        const response = await DeleteCertification(certificationId);
        if (response.status === 204) {
            const updatedCertifications = certifications.filter(cert => cert.certificationId !== certificationId);
            setCertToDelete(null);
            onSubmit(updatedCertifications);
        } else {
            onError(response);
        }
        setIsLoading(false);
    }


    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 p-8 rounded-lg z-50 space-y-2">
                {/*Header*/}
                <div className="flex items-baseline justify-between">
                    <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
                    <button onClick={onCancel} className="text-3xl text-error font-bold">&times;</button>
                </div>
                {/*Body*/}
                <div className="space-y-4">
                    <div className="flex space-x-2">
                        <button 
                            className="btn btn-sm btn-success text-white"
                            disabled={certifications.some(cert => cert.certificationType === "Mapping")}
                            onClick={() => postCertificationToUser(mappingApplication)}
                        >
                            &#x2B; Mapping Application
                        </button>
                        <button 
                            className="btn btn-sm btn-success text-white"
                            disabled={certifications.some(cert => cert.certificationType === "Appraiser")}
                            onClick={() => postCertificationToUser(appraisalApplication)}
                        >
                            &#x2B; Appraisal Application
                        </button>
                    </div>

                    <div className="bg-base-300 rounded-xl max-h-96">
                        {certifications.length > 0 ? (
                            <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Status</th>
                                    <th>Certification</th>
                                    <th>Id</th>
                                    <th>Request Date</th>
                                    <th>Approval Date</th>
                                    <th>Approved By ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certifications.map(cert => (
                                    <tr key={cert.certificationId}>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-error text-white"
                                                disabled={cert.isApproved}
                                                onClick={() => handleDeleteCertification(cert.certificationId)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td
                                            className={cert.isApproved ? "text-success" : (cert.approvalDate ? "text-error" : "text-warning")}
                                        >
                                            {cert.isApproved ? "Approved" : (cert.approvalDate ? "Rejected" : "Pending")}
                                        </td>
                                        <td>{cert.certificationType}</td>
                                        <td>{cert.certificationId}</td>
                                        <td>{formatToMountainTime(cert.requestDate, "MM/DD/YYYY")}</td>
                                        <td
                                            className={!cert.approvalDate ? "text-warning" : ""}
                                        >
                                            {cert.approvalDate ? formatToMountainTime(cert.approvalDate, "MM/DD/YYYY") : "Pending"}
                                        </td>
                                        <td
                                            className={!cert.approvalDate ? "text-warning" : ""}
                                        >
                                            {cert.approvedBy ? cert.approvedBy : "Pending"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        ) : (
                            <div className="card w-full bg-base-300 p-4 mb-4">
                                <p className="text-error">No certifications found.</p>
                            </div>
                        )}

                    </div>
                </div>
                {/*Footer*/}
                <div className="flex space-x-2">
                    <button onClick={onCancel} className="btn btn-error text-white">Cancel</button>
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

}

export default UserCertificationModal;