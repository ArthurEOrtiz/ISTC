import { PDF } from "@/app/shared/types/sharedTypes";
import { ChangeEvent, useState } from "react";

interface SelectPDFModalProps {
    open: boolean;
    onAdd: (pdf: PDF) => void;
    onClose: () => void;
    onRemove: () => void;
    PDF: PDF | null;
}

const SelectPDFModal: React.FC<SelectPDFModalProps> = ({ open, onAdd, onClose, onRemove, PDF: inboundPDF }) => {
    
    const [PDF, setPDF] = useState<PDF>(inboundPDF || { pdfId: 0, courseId: 0, fileName: "", data: ""});
    const [error, setError] = useState<string | null>(null);
    
    const handleOnChange = (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    const splitResult = e.target.result.split(",");
                    if (splitResult.length > 1) {
                        const base64Data = splitResult[1];
                        setPDF({ ...PDF, fileName: file.name, data: base64Data });
                    } else {
                        setError('Unexpected result format');
                    }
                } else {
                    setError('Result is not a string');
                }
            };
            reader.readAsDataURL(file);
        }
    }


    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${open ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="bg-base-100 p-8 rounded-lg z-50 w-1/2">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Select PDF</h2>
                    <button onClick={onClose} className="text-error font-bold">X</button>
                </div>
                <div className="space-y-4">
                    <p className="text-lg">Select a PDF file to upload</p>
                    {error && <p className="text-error">{error}</p>}
                    <div>
                        <input
                            type="file"
                            id="file"
                            className="file-input file-input-bordered w-full text-primary bg-base-200"
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onAdd(PDF)}
                            className="btn btn-success text-white"
                            disabled={!PDF.data || !PDF.fileName.endsWith('.pdf')}
                        >
                            Add PDF
                        </button>
                        <button
                            onClick={() => onRemove()}
                            className="btn btn-error text-white"
                            disabled={!inboundPDF}
                        >
                            Remove PDF
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default SelectPDFModal;
