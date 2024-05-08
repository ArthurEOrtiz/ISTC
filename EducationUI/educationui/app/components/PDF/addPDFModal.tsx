import { PDF } from "@/app/shared/types/sharedTypes";
import { useState } from "react";

interface AddPDFModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (pdf: PDF) => void;
    PDF: PDF | null;
}

const AddPDFModal: React.FC<AddPDFModalProps> = ({ open, onClose, onAdd, PDF: inboundPDF }) => {
    const [PDF, setPDF] = useState<PDF>(inboundPDF || { pDFId: 0, courseId: 0, fileName: "", data: ""});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${open ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="bg-base-100 p-8 rounded-lg z-50">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Add PDF</h2>
                    <button onClick={onClose} className="text-error font-bold">X</button>
                </div>
                <div>
                    {/* <label htmlFor="fileName">File Name</label>
                    <input
                        type="text"
                        id="fileName"
                        value={PDF?.fileName}
                        onChange={(e) => setPDF({ ...PDF, fileName: e.target.value })}
                    /> */}
                    {/*File upload */}
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => {
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
                                            console.error('Unexpected result format');
                                        }
                                    } else {
                                        console.error('Result is not a string');
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />

                    <button
                        onClick={() => {
                            if (PDF) {
                                onAdd(PDF);
                            }
                        }}
                    >
                        Add PDF
                    </button>

                </div>
            </div>

            


        </div>
    );

}

export default AddPDFModal;
