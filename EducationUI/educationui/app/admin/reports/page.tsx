import EmployerReport from "@/components/Reports/EmployerReport";
import { GetEmployers } from "@/Utilities/api"

const ReportsPage: React.FC = async () => {

    const response = await GetEmployers();
    const employers: string[] = response.data;

    return (
        <div>
            <div>
                <h1 className="p-2 text-3xl text-center font-bold">Reports</h1>
            </div>
            <div className="bg-base-300 rounded-xl m-4 p-2 space-y-2">
                <div className="bg-base-100 rounded-xl">
                    <div>
                        <h2 className="text-xl text-center font-bold">Enrollment By Employer</h2>
                    </div>
                    <div className="">
                        <EmployerReport employers={employers}/>  
                    </div>
                </div>
                <div className="bg-base-100 rounded-xl">
                    <div>
                        <h2 className="text-xl text-center font-bold">Mapping Certification</h2>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReportsPage