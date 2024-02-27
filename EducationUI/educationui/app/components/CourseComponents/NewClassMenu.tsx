'use client';

interface NewClassMenuProps {
    onBack: () => void;
    onAddClass: () => void;
    onSaveCourse: () => void;
}

const NewClassMenu : React.FC<NewClassMenuProps> = ({onBack, onAddClass, onSaveCourse}) => {
    return (
        <div className="flex justify-between">

        <div>
            <button
                className="btn btn-primary text-white"
                onClick = {onBack}
                >
                Back to Course Information
            </button>

            <button
                className="btn btn-primary text-white ml-3"
                onClick = {onSaveCourse}
                >
                    Save Course
            </button>
        </div>

        <button
            className="btn btn-primary text-white"
            onClick = {onAddClass}
        >
            Add Class
        </button>
    </div>
    );
}

export default NewClassMenu;