interface ErrorModalProps {
    title: string;
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 rounded-xl p-4 z-50 min-w-72 max-w-96">
                <div className="flex justify-between items-baseline mb-4">
                    <h2 className="font-bold text-lg text-error">{title}</h2>
                    <button onClick={onClose} className="text-error text-3xl font-bold">&times;</button>
                </div>
                
                <div className="bg-error rounded-xl p-2 mb-4">
                    <p className="">{message}</p>
                </div>
                
                <button onClick={onClose} className="btn btn-ghost dark:text-white">Close</button>
            </div>
        </div>
    );
};

export default ErrorModal;