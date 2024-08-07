import { useState } from 'react';

interface FormComponentProps {
    employers: string[];
    onSubmit: (startDate: string, endDate: string, employer: string) => void;   
}

const FormComponent: React.FC<FormComponentProps> = ({ employers, onSubmit }) => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedEmployer, setSelectedEmployer] = useState<string>('');
    const [error, setError] = useState<string>(''); 

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (new Date(startDate) > new Date(endDate)) {
            setError('Start date must be before end date.');
            return;
        }

        setError('');
        onSubmit(startDate, endDate, selectedEmployer);
    };

    return (
        <form className="space-y-2 p-2" onSubmit={handleSubmit}>
            <div className="flex space-x-2">
                <div className="flex-1">
                    <label className="input input-bordered flex items-center justify-between">
                        Start Date
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                </div>
                <div className="flex-1">
                    <label className="input input-bordered flex items-center justify-between">
                        End Date
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                </div>
            </div>
            {error && <div className="text-error text-sm">{error}</div>}
            <div className="flex space-x-2">
                <div className="flex-1">
                    <select 
                        className="select input-bordered w-full" 
                        value={selectedEmployer}
                        onChange={(e) => setSelectedEmployer(e.target.value)}
                        >
                            <option value="" disabled selected={!selectedEmployer}>Employer</option>
                            {employers.map(employer => (
                                <option key={employer} value={employer}>{employer}</option>
                            ))}
                    </select>
                </div>
                <div className="flex-1">
                    <button
                        className="btn btn-warning text-white"
                        onClick={() => {
                            setStartDate('');
                            setEndDate('');
                            setSelectedEmployer('');
                            setError('');
                        }}
                    >
                        Reset
                    </button>
                </div>   
            </div>
            <div className='flex justify-end'>
                <button 
                    className="btn btn-success text-white" 
                    type="submit"
                    disabled={!startDate || !endDate || !selectedEmployer}
                    >
                    Preview Report
                </button>
            </div>
        </form>
    );
};

export default FormComponent;