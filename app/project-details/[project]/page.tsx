"use client";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import SideNavBar from "@/components/client/side-nav";
import { useState, useEffect } from "react"; 
import Cookies from "js-cookie";
import { toast , Toaster} from "react-hot-toast";
import Link from "next/link";
export default function ClientProjectDetails() {
  const params = useParams();
  const project = params.project as string

  type arrayType = {
    id:string,
    task_name: string,
    status: string,
    start_date: string,
    due_date: string,
    title_description:string,
  }

  type ProjectType = {
    id:string,
    project_name: string
}

  const [ array , setArray ] = useState<arrayType[]>()
  const [ linkId , setLinkId ] = useState<ProjectType | null>(null)

  useEffect(() => {
    const user_token = Cookies.get("access-token")
    const fetchingFunction = async () => {
      const sendingToken = await fetch("/API/cli/project/project-task", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          user_token:user_token,
        })
      })
      const ServerResponse = await sendingToken.json()
      if (ServerResponse.status == 400) {
        toast.error("Please Login Again")
      } else if (ServerResponse.status == 500) {
        toast.error("internal server error")
        Cookies.remove("access-token")
        window.location.reload()
      } else {
        const filterProject = ServerResponse.find((items: ProjectType) => items.project_name.toLowerCase() === decodeURI(project).toLowerCase())
        if (filterProject == undefined) {
          window.location.href="/projects"
        } else {
          setArray(filterProject.project_task)
          setLinkId(filterProject)
        }
      }
    }
    fetchingFunction()
},[])


  return <>
    <Toaster/>
    <SideNavBar />
    <div className="project-details-container ml-[400px] pt-[150px]">

      <div className="project-name text-[18px] text-[#747474]">
        <p>Project Details / {decodeURI(project)} / 
<button onClick={() => window.location.href = `/edit-project/${linkId?.id}` || "#"} className="text-blue-500 cursor-pointer">
  Edit Project
</button></p>
        </div>

      <div className="table-card mt-[50px]">

         {
          
          array?.length === 0 ? (
          
            <div className="flex justify-center items-center align-center mt-[300px]">

              <div className="message text-center">
                  <h1 className="text-[40px] font-extrabold text-[#aaaaaa]">No task found!</h1>
                <h1 className=" text-[#aaaaaa]">Please click 'Add Task' and customize it.</h1>
                <button onClick={()=>window.location.href="/add-task"} className="mt-[10px] h-[35px] w-[150px] bg-blue-500 cursor-pointer text-[white]">Add task now</button>

            </div>
          </div>
          
          ) : (
                    array?.map((items ,index) => {
                return (
                
          <div key={index} className="each-table-card border-l-5 border-blue-500 mt-[50px] w-[90%] cursor-pointer rounded-[10px] h-[auto] pb-[50px] shadow-[0_0_5px_#747474]">
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
              <button onClick={()=>window.location.href=`/edit-task/${decodeURI(project)}/${items.id}`} className="w-[150px] h-[40px] bg-yellow-500 cursor-pointer text-white">Edit Task </button>
              <button className="ml-[20px] w-[150px] h-[40px] bg-red-500 cursor-pointer text-white">Delete Task </button>
            </div>
          </div>
          
        </div>
                )
              })
          )
            
            }




      </div>

    </div>
  </>;
}
