'use client';

interface NewClassMenuProps {
    onBack: () => void;
    onAddClass: () => void;
}

const NewClassMenu : React.FC<NewClassMenuProps> = ({onBack, onAddClass}) => {
    return (
        <div className="flex justify-between">
        <button
            className="btn btn-primary text-white mt-3 mb-3"
            onClick={onBack}>
            Back to Course Information
        </button>

        <button
            className="btn btn-primary text-white mt-3 mb-3"
            onClick={onAddClass}
        >
            Add Class
        </button>
    </div>
    );
}

export default NewClassMenu;