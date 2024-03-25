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
            <div className="bg-white p-8 rounded-lg z-50">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-between">
                    {onCancel && (
                        <>
                        <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Yes</button>
                        <button onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">No</button>
                        </>
                    )}
                    {!onCancel && (
                        <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">OK</button>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
