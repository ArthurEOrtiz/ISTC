import React from 'react';
import { Certification } from "@/Utilities/sharedTypes";
import { formatToMountainTime } from "@/Utilities/dateTime";

interface CertificationListProps {
  certifications: Certification[];
  type: 'pending' | 'reviewed';
  onApprove?: (certificationId: number) => void;
  onRevoked?: (certification: Certification) => void;
  onReject?: (certification: Certification) => void;
  onDelete?: (certification: Certification) => void; 
}

const CertificationList: React.FC<CertificationListProps> = ({ certifications, type, onApprove, onRevoked, onReject, onDelete }) => {
    // Constants
    const isPending = type === 'pending';

    // Handlers
    const handleApproveOrRevoke = (certification: Certification) => {
        if (certification.isApproved) {
        onRevoked && onRevoked(certification);
        } else {
        onApprove && onApprove(certification.certificationId);
        }
    };

    return (
        <>
        {certifications.length > 0 ? (
            certifications.map((certification: Certification, index) => (
            <div key={index} className="card w-full bg-base-300 p-4 mb-4">
                <div className="flex space-x-2 justify-end">
                <p>Certification Id :</p>
                <p>{certification.certificationId}</p>
                </div>

                <div className="flex space-x-2">
                <p className="font-bold">Certification Type :</p>
                <p>{certification.certificationType}</p>
                </div>

                <div className="flex space-x-2">
                <p className="font-bold">Request Date :</p>
                <p>{formatToMountainTime(certification.requestDate, 'MMMM Do YYYY, h:mm a')}</p>
                </div>

                {isPending ? (
                <div className="space-x-3 mt-3">
                    <button 
                        className="btn btn-sm btn-success text-white"
                        onClick={() => onApprove && onApprove(certification.certificationId)}
                    >
                        Approve
                    </button>
                    <button 
                        className="btn btn-sm btn-error text-white"
                        onClick={() => onReject && onReject(certification)}
                    >
                        Reject
                    </button>
                </div>
                ) : (
                <>
                    <div className="flex space-x-2">
                    <p className="font-bold">Is Approved :</p>
                    <p className={certification.isApproved ? "text-success" : "text-error"}>{certification.isApproved ? "Yes" : "No"}</p>
                    </div>
                    <div className="flex space-x-2">
                    <p className="font-bold">Approval Date :</p>
                    <p className={certification.approvalDate === null ? "text-error" : ""}>{certification.approvalDate ? formatToMountainTime(certification.approvalDate, 'MMMM Do YYYY, h:mm a') : "None"}</p>
                    </div>
                    <div className="flex space-x-2">
                    <p className="font-bold">Approved By ID :</p>
                    <p className={certification.approvedBy === null ? "text-error" : ""}>{certification.approvedBy ? certification.approvedBy : "None"}</p>
                    </div>
                    <div className='space-x-3 mt-3'>
                        <button 
                            className={`btn btn-sm text-white ${certification.isApproved ? "btn-warning" : "btn-success"}`}
                            onClick={() => handleApproveOrRevoke(certification)}
                        >
                            {certification.isApproved ? "Revoke" : "Approve"}
                        </button>
                        <button 
                            className="btn btn-sm btn-error text-white"
                            onClick={() => onDelete && onDelete(certification)}
                        >
                            Delete
                        </button>
                    </div>
                    
                </>
                )}
            </div>
            ))
        ) : (
            <div className="card w-full bg-base-300 p-4 mb-4">
            <p className='text-error'>No certifications found.</p>
            </div>
        )}
        </>
  );
};

export default CertificationList;