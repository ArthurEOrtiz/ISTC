'use client';

interface ClassFromProps {
}

const NewClass : React.FC<ClassFromProps> = () => {
    return (
        <div className = "bg-white shadow-md rounded-md p-4">
           <label 
                htmlFor = "classDate"
                className="block text-gray-700 text-sm font-bold mb-2">
                    Class Date
            </label>
            <input 
                type="date"
                name="classDate"
                id="classDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue = {new Date().toISOString().split('T')[0]}
                min = {new Date().toISOString().split('T')[0]}
            />      
        </div>

    );
}

export default NewClass