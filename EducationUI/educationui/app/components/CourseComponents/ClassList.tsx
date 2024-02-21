const ClassList: React.FC<ClassListProps> = ({ classes }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {classes.map((course, index) => (
                <div key={index} className="card w-full bg-base-100 shadow-xl">

                </div>
            ))}
        </div>
    );
}