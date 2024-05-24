import React from 'react';

interface ConfirmationModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 p-8 rounded-lg z-50 w-1/2">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-between">
                    {onCancel && (
                        <>
                        <button onClick={onConfirm} className="btn btn-success text-white ">Yes</button>
                        <button onClick={onCancel} className="btn btn-error text-white">No</button>
                        </>
                    )}
                    {!onCancel && (
                        <button onClick={onConfirm} className="btn btn-primary text-white">OK</button>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
