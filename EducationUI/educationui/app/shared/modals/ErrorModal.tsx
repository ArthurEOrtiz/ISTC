interface ErrorModalProps {
    title: string;
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-error p-8 rounded-lg z-50">
                <h2 className="text-xl text-white font-semibold mb-4">{title}</h2>
                <p className="text-lg text-white mb-4">{message}</p>
                <button onClick={onClose} className="btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
            </div>
        </div>
    );
};

export default ErrorModal;