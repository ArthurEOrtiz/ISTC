'use client';
import { useState } from "react";
import EmployerReportForm from "./Forms/EmployerReportForm";
import EmployerReportPreviewModal from "./Modals/EmployerReportPreviewModal";

interface EmployerReportProps {
    employers: string[];
}

const EmployerReport: React.FC<EmployerReportProps> = ({ employers }) => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        employer: ''
    });
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    return (
        <>
            <EmployerReportForm 
                employers={employers} 
                onSubmit={(startDate, endDate, employer) => {
                    setFormData({
                        startDate,
                        endDate,
                        employer
                    });
                    setShowPreviewModal(true);
                }}
            />
            {showPreviewModal && (
                <EmployerReportPreviewModal
                    formData={formData}
                    visible={showPreviewModal}
                    onClose={() => setShowPreviewModal(false)}
                />
            )}
        </>
    );
}

export default EmployerReport;