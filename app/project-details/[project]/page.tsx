"use client";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import SideNavBar from "@/components/client/side-nav";
import { useState , useEffect} from "react"; 
export default function ClientProjectDetails() {
  const params = useParams();
  const project = params.project as string

  type arrayType = {
    task_name: string,
    status: string,
    start_date: string,
    due_date: string,
    title_description:string,
  }

  const [ array , setArray ] = useState<arrayType[]>()

  const TaskArrays = [
  {
    "task_name": "Design login UI",
    "status": "in progress",
    "start_date": "05/03/2024",
    "due_date": "12/03/2024",
    "title_description": "Create and style login and signup screens for the app."
  },
  {
    "task_name": "Fix user auth bug",
    "status": "complete",
    "start_date": "20/01/2024",
    "due_date": "22/01/2024",
    "title_description": "Resolved token refresh issue in the user authentication flow."
  },
  {
    "task_name": "Implement dashboard chart",
    "status": "paused",
    "start_date": "15/02/2024",
    "due_date": "25/02/2024",
    "title_description": "Build analytics chart using Recharts for user activity."
  },
  {
    "task_name": "Integrate email verification",
    "status": "incomplete",
    "start_date": "10/03/2024",
    "due_date": "18/03/2024",
    "title_description": "Send email to users after registration to verify their identity."
  },
  {
    "task_name": "Setup MongoDB indexes",
    "status": "complete",
    "start_date": "02/01/2024",
    "due_date": "05/01/2024",
    "title_description": "Optimized performance by adding proper indexing to database collections."
  }
       
  ]
  useEffect(() => {
  setArray(TaskArrays)
},[])


  return <>
    <SideNavBar />
    <div className="project-details-container ml-[400px] pt-[150px]">

      <div className="project-name text-[18px] text-[#747474]">
        <p>Project Details / { decodeURI(project) }</p>
        </div>

      <div className="table-card mt-[50px]">

         {
              array?.map((items ,index) => {
                return <>
                
          <div key={index} className="each-table-card mt-[50px] w-[90%] cursor-pointer rounded-[10px] h-[auto] pb-[50px] shadow-[0_0_5px_#747474]">
          <div className="inner-part pl-[20px] pt-[20px]">
          <h1 className=" text-[#252525] text-[20px] ">{items.task_name}</h1>
          <p className="pt-[10px]">{ items.title_description}</p>
                      <div className="badge-sect mt-[10px]">
                        {
                          items.status == "complete" ? (
                            <>
                            <Badge variant="secondary" className="bg-green-100 text-green-600">{items.status}</Badge>
                            </>
                          ) : items.status == 'paused' ? (<>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-600">{items.status}</Badge>
                            </>) : (<>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-600">{items.status}</Badge>
                              </>) 
                        }
           
            </div>
            <div className="date-picker mt-[20px]">
              <p>20/02/2025 - 12/06/2025</p>
            </div>
            <div className="button-card-section mt-[20px] flex flex-wrap">
              <button className="w-[150px] h-[40px] bg-yellow-500 cursor-pointer text-white">Edit Task </button>
              <button className="ml-[20px] w-[150px] h-[40px] bg-red-500 cursor-pointer text-white">Delete Task </button>
            </div>
          </div>
          
        </div>
                </>
              })
            
            }




      </div>

    </div>
  </>;
}
