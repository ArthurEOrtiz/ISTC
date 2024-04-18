interface ErrorModalProps {
    title: string;
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 rounded-lg p-4 z-50">
                <h2 className="font-bold text-lg text-error mb-4">{title}</h2>
                <p className="text-lg mb-4">{message}</p>
                <button onClick={onClose} className="btn btn-ghost dark:text-white">Close</button>
            </div>
        </div>
    );
};

export default ErrorModal;