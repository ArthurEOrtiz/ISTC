import { Class } from "@/app/shared/types/sharedTypes";

interface ClassAttendanceCardProps {
    class: Class;
}

const ClassAttendanceCard: React.FC<ClassAttendanceCardProps> = ({ class : cls}) => {
    return (
        <div className="card bg-base-200 shadow-xl w-full">
            <div className="card-body">
                <h2 className="card-title">{new Date(cls.scheduleStart).toLocaleDateString()}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );

}

export default ClassAttendanceCard;