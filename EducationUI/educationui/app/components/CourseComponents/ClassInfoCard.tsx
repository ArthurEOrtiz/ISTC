import { ClassSchedule } from "@/app/shared/types/sharedTypes";

interface ClassInfoCardProps {
    classSchedule: ClassSchedule;
};

const ClassInfoCard: React.FC<ClassInfoCardProps> = ({classSchedule}) => {
    const getStartDate = (date: string) => {
        const startDate = new Date(date);
        const formattedDate = startDate.toLocaleDateString(
            'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            }
        );
        return formattedDate;
    }

    const getTime = (date: string) => {
        const startTime = new Date(date);
        const formattedTime = startTime.toLocaleTimeString(
            'en-US', {
                hour: 'numeric',
                minute: 'numeric'
            }
        );
        return formattedTime;
    }

        
    return (
        <div className="card w-full bg-base-100 shadow-xl m-2">
            <div className="card-body">
                <label className="text-1xl font-bold" htmlFor="date">Date</label>
                <p id="date" className="text-base">{getStartDate(classSchedule.scheduleStart)}</p>
                <div className="flex justify-between"> {/* Container for Start Time and End Time */}
                    <div>
                        <label className="text-1xl font-bold" htmlFor="startTime">Start Time</label>
                        <p id="startTime" className="text-base">{getTime(classSchedule.scheduleStart)}</p>
                    </div>
                    <div>
                        <label className="text-1xl font-bold" htmlFor="endTime">End Time</label>
                        <p id="endTime" className="text-base">{getTime(classSchedule.scheduleEnd)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassInfoCard;
