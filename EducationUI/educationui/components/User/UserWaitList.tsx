import { Course, User } from "@/Utilities/sharedTypes";
import { GetUserWaitList } from "@/Utilities/api";
import { useEffect, useState } from "react";
import CourseActionContainer from "../Course/CourseActionContainer";

interface UserWaitListProps {
    user: User;
    onError: (message: string) => void;
}

const UserWaitList: React.FC<UserWaitListProps> = ({user, onError}) => {
    const [ waitList, setWaitList ] = useState<Course[]>([]);
    const [ dropQueue, setDropQueue ] = useState<Course[]>([]);
    const [ menuSelection, setMenuSelection ] = useState<"waitList" | "dropQueue">('waitList');
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (user) {
            if (menuSelection === 'waitList') {
                getWaitList();
            } else {
                getDropQueue();
            }
        }
        
    }, [menuSelection]);

    const getWaitList = async () => {
        setIsLoading(true);
        const response = await GetUserWaitList(user.userId, true);
        if (response.status === 200) {
            setWaitList(response.data);
        } else {
            onError(`There was an error getting the user's wait list. ${response}`);
        }
        setIsLoading(false);
    }

    const getDropQueue = async () => {
        setIsLoading(true);
        const response = await GetUserWaitList(user.userId, false);
        if (response.status === 200) {
            setDropQueue(response.data);
        } else {
            onError(`There was an error getting the user's drop queue. ${response}`);
        }
        setIsLoading(false);
    }


    return (
        <div className="bg-base-100 shadow-md rounded-xl p-4 w-full space-y-4">
            <div>
                <h1 className="text-2xl text-center font-bold mb-2">Wait List</h1>

                <div className="join">
                    <button
                        className={`join-item btn ${menuSelection === 'waitList' ? 'btn-primary text-white' : ''}`}
                        onClick={() => setMenuSelection('waitList')}
                    >
                        Wait List
                    </button>
                    <button
                        className={`join-item btn ${menuSelection === 'dropQueue' ? 'btn-primary text-white' : ''}`}
                        onClick={() => setMenuSelection('dropQueue')}
                    >
                        Drop Queue
                    </button>
                </div>
            </div>
            <div>
                {menuSelection === 'waitList' ? (
                    <div className="space-y-2">
                        {isLoading ? 
                            (
                                <div className="rounded-xl w-full bg-base-200 p-4 mb-4">
                                    <div className="flex justify-center">
                                        <span className="loading loading-spinner loading-lg"></span>
                                    </div>
                                    <p className="text-center">Loading courses...</p>
                                </div>
                            ) : (
                                waitList.length > 0 ? (
                                    waitList.map((course: Course, index: number) => (
                                        <div key={index} className="card w-full bg-base-200 p-4 mb-4">
                                            <CourseActionContainer
                                                user={user}
                                                course={course}
                                                onError={(error) => console.log(error)}
                                                sendEmail={(to: User, subject: string, body: string) => console.log(to, subject, body)} 
                                                isAdmin={true}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-error">No courses available!</p>
                                )
                            )
                        }
                    </div>
                ) : (
                    <div className="space-y-2">
                        {isLoading ? (
                            <div className="rounded-xl w-full bg-base-200 p-4 mb-4">
                                <div className="flex justify-center">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </div>
                                <p className="text-center">Loading courses...</p>
                            </div>
                        ) : (
                            dropQueue.length > 0 ? (
                                dropQueue.map((course: Course, index: number) => (
                                    <div key={index} className="card w-full bg-base-200 p-4 mb-4">
                                        <CourseActionContainer
                                            user={user}
                                            course={course}
                                            onError={(error) => console.log(error)}
                                            sendEmail={(to: User, subject: string, body: string) => console.log(to, subject, body)}
                                            isAdmin={true}
                                        />
                                    </div>
                                ))
                                
                            ) : (
                                <p className="text-center text-error">No courses available!</p>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserWaitList;