interface SavingModalProps {
    text: string;
}

const SavingModal: React.FC<SavingModalProps> = ({text}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg z-50">
                        <h2 className="text-xl font-semibold mb-4">{text}</h2>
                        <span className="loading loading-spinner text-primary"></span>
                    </div>
                </div>
    )
}

export default SavingModal

