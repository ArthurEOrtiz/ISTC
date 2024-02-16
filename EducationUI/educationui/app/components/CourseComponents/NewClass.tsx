import React, { useState } from 'react';

interface ClassFromProps {}

const NewClass: React.FC<ClassFromProps> = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleRemoveClick = () => {
        setIsVisible(false);
    };

    return isVisible ? (
        <div className="bg-white shadow-md rounded-md p-4 relative">
            <button
                className="absolute top-0 right-0 mr-2 mt-2 bg-red-500 text-white px-2 py-1 rounded"
                onClick={handleRemoveClick}
            >
                Remove
            </button>
            <label htmlFor="classDate" className="block text-gray-700 text-sm font-bold mb-2">
                Class Date
            </label>
            <input
                type="date"
                name="classDate"
                id="classDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={new Date().toISOString().split('T')[0]}
                min={new Date().toISOString().split('T')[0]}
            />
        </div>
    ) : null;
};

export default NewClass;
