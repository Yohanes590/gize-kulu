"use client"
import { useParams } from "next/navigation"
import SideNavBar from "@/components/client/side-nav"
import Cookies from "js-cookie"
import { useState , useEffect } from "react"
export default function EditProject() {
      type projectType = {
            due_date: string,
            id: string,
            project_description: string,
            project_name: string,
            project_status: string,
            started_date:string
      }
      const params = useParams()
      const  [ ProjectArray , setProjectArray ] = useState<projectType[]>() 
      const projectId = params.id as string



      const [nameValue, setNameValue] = useState<string>("")
      const [sDateValue, setSDateValue] = useState<string>("")
      const [dueDateValue, setDueDateValue] = useState<string>("")
      const [statusValue, setStatusValue] = useState<string>("")
      const [description ,setDescriptionValue ] =useState<string>("")
      useEffect(() => {


             const fetchProject = async () => {
                 const ClientToken = Cookies.get("access-token")
                  const sendCookie = await fetch("/API/cli/project/show-projects", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                              user_token: ClientToken,
                        })
                  })
                   const serverResponse = await sendCookie.json()
                   const filterName = serverResponse.filter((id:{id:string}) => id.id ===decodeURI(projectId) )
                   if (!filterName) {
                         window.location.href="/add-project"
                   } else {
                   setProjectArray(filterName)
                   setNameValue(filterName[0].project_name)
                   const filterDate = new Date(filterName[0].started_date)
                   setSDateValue(filterDate.toISOString().split("T")[0])
                   const FilterDueDate = new Date(filterName[0].due_date)
                   setDueDateValue(FilterDueDate.toISOString().split("T")[0])
                   setStatusValue(filterName[0].project_status)
                   setDescriptionValue(filterName[0].project_description)
                   }
            } 
                   fetchProject()

      }, [])
      
                 const sendToServer = async () => {
                 const ClientToken = Cookies.get("access-token")
                  const sendCookie = await fetch("/API/cli/project/edit-project", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                              user_token: ClientToken,
                              projectId:decodeURI(projectId)
                        })
                  })
                  const serverResponse = await sendCookie.json()
                  console.log(serverResponse)
            }

      return <>
            <SideNavBar />
            <div className="container-edit-project ml-[400px] pt-[100px]">
                  <div className="heading-project text-[18]">
                        <h1>Edit Project / {decodeURI(projectId)} / <span className="text-blue-500">{ ProjectArray?.[0].project_name}</span></h1>
                  </div>
                  <div className="input-section mt-[50px]">
                        <div className="span-hover mb-[30px]">
                              <p>Project Name</p>
                        <input value={nameValue} onChange={(e)=>setNameValue(e.target.value)} className="w-[500px] h-[50px] pl-[15px] outline-1 outline-blue-500 mt-[10px] bg-[#f0f0f0]" type="text" placeholder="making some thing *" />
                        </div>
                        <div className="span-hover mb-[30px]">
                              <p>Started Date</p>
                        <input value={sDateValue} onChange={(e)=>setSDateValue(e.target.value)} type="date" className="w-[500px] h-[50px] outline-1 outline-blue-500 pl-[15px] mt-[10px] bg-[#f0f0f0]" />
                        </div>
                        <div className="span-hover mb-[30px]">
                              <p>Due Date</p>
                        <input value={dueDateValue} onChange={(e)=>setDueDateValue(e.target.value)} type="date" className="w-[500px] h-[50px] outline-1 outline-blue-500 pl-[15px] mt-[10px] bg-[#f0f0f0]" />
                        </div>

                         <div className="span-hover mb-[30px]">
                        <p>Started Date</p>
                              <select value={statusValue} onChange={(e)=>setStatusValue(e.target.value)} className="w-[500px] h-[50px] outline-1 outline-blue-500 pl-[15px] mt-[10px] bg-[#f0f0f0]">
                                    <option value="in-complete">In Complete</option>
                                    <option value="progress">Progress</option>
                                    <option value="complete">Complete</option>
                                    <option value="pause">Paused</option>
                        </select>
                        </div>
                        

                  <div className="span-hover">
                        <p>Project Description</p>
                                    <textarea value={description} onChange={(e)=>setDescriptionValue(e.target.value)} className="w-[500px] h-[200px] outline-1 outline-blue-500 pl-[15px] mt-[10px] bg-[#f0f0f0] pt-[15px]" placeholder="This project ....."></textarea>
                        </div>

                                <div className="span-hover mb-[30px]">
                        <button className="bg-amber-400 w-[500px] h-[45px] cursor-pointer">Save Changes</button>
                        </div>

                  </div>
                  
            </div>
            
      </>
}