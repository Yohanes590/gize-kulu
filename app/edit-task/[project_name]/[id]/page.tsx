"use client"
import { useParams } from "next/navigation"
import SideNavBar from "@/components/client/side-nav"
import { useEffect , useState } from "react"
import Cookies from "js-cookie"
export default function EditTaskInfo() {
      const params = useParams()
      const fetchPrams = params.id as string
      const fetchProjectName = params.project_name as string

      const [TaskName, setTaskName] = useState<string | undefined>("")
      const [Priority, setPriority] = useState<string | undefined>("")
      const [startDate, setStartDate] = useState<string | undefined>("")
      const [dueDate, setDueDate] = useState<string | undefined>("")
      const [progress, setProgress] = useState<string | undefined>("")
      const [description , setDescription] = useState<string | undefined>("")

      useEffect(() => {


            const fetchTaskInformation = async () => {
                  const user_token = Cookies.get("access-token")
                  const sendingToken = await fetch("/API/cli/project/project-task", {
                        method: "post",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              user_token: user_token,
                        })
                  })
                  const server_response = await sendingToken.json()
                  const GettingProjectTask = server_response[0].project_task
                  const filterProjectTask = GettingProjectTask.filter((id: { id: string }) => id.id === fetchPrams)
                  if (!filterProjectTask) {
                        window.location.href="/dashboard"
                  } else {
                        console.log(filterProjectTask)
                        setTaskName(filterProjectTask[0].task_name)
                        setPriority(filterProjectTask[0].project_priority)
                        const StartDateOBJ = new Date(filterProjectTask[0].start_date)
                        setStartDate(StartDateOBJ.toISOString().split("T")[0])
                        const DueDateOBJ = new Date(filterProjectTask[0].due_date)
                        setDueDate(DueDateOBJ.toISOString().split("T")[0])
                        setProgress(filterProjectTask[0].status)
                        setDescription(filterProjectTask[0].title_description)
                  }
      }  
      fetchTaskInformation()
      },[])

      return <>
            <SideNavBar/>
            <div className="editing-task-part ml-[400px] pt-[150px]">
                  

                  <div className="title-message mb-[20px]">
                        <p>Edit Task / {decodeURI(fetchProjectName)} / <span className="text-blue-600">{fetchPrams}</span> / {TaskName} </p>
                  </div>

                  <div className="editing-task-container">
                        <div className="each-input-section mb-[20px] flex flex-wrap gap-5">
                        <input type="text" value={TaskName} onChange={(e)=>setTaskName(e.target.value)} placeholder="Task title" className="task-title w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]" />
                        <select value={Priority} onChange={(e)=>setPriority(e.target.value)} className="priority w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]">
                              <option value="">Select Priority</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                        </select>
                        </div>

                        <div className="each-input-section flex flex-wrap gap-5">
                              <div className="label">
                                    <p>Start date</p>
                                     <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="start-date w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"/>
                              </div>
                              <div className="label">
                                    <p>Due date</p>
                                     <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)}  className="dueDate w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"/>
                              </div>
                        </div>
                        
                        <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
                              <div className="label">
                                    <p>Select Status</p>
                                    <select value={progress} onChange={(e)=>setProgress(e.target.value)} className="task-status mt-[10px] w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]">
                                          <option value="IN PROGRESS">IN PROGRESS</option>
                                          <option value="COMPLETE">COMPLETE</option>
                                          <option value="IN COMPLETE">IN COMPLETE</option>
                                          <option value="PAUSE">PAUSE</option>
                                    </select>
                        </div>
                        </div>
                        
                        <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
                              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="description" className="task-description mt-[10px] pt-[20px] w-[1130px] h-[250px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"></textarea>
                              </div>
                        <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
                        <button className="mt-[20px] h-[40px] bg-blue-500 w-[200px] cursor-pointer text-white">Save changes</button>
                        </div>
                  </div>
        </div>
      </>
}