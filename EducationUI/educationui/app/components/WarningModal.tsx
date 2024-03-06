

interface WarningModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({title, message, onConfirm}) => {
    return (
        <div className="modal fade" id="warningModal" tabIndex={-1} role="dialog" aria-labelledby="warningModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="warningModalLabel">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick = {onConfirm}
                            >Okay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarningModal;