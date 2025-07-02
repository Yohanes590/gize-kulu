"use client"
import SideNavBar from "./client/side-nav"
import ProjectDatePicker from "./prject-date"
import ProjectDueDate from "./due-projecr-date"
import Cookie from 'js-cookie'
import { useState } from "react"
import { Toaster ,toast } from "react-hot-toast"
export default function AddingProjectFunction() {

      const [startDate, setStartDate] = useState<Date | undefined>();
      const [dueDate, setDueDate] = useState<Date | undefined>();
      const [buttonBiz, setButton] = useState<boolean>()
      
      const CreatingProject = async () => {
            const ProjectId = Math.random().toString(36).slice(2)
            const createButton = document.getElementById("button-create-task") as HTMLElement
            const ErrorDisplay = document.getElementById("error-display") as HTMLInputElement
            const userToken = Cookie.get("access-token")
            const ProjectName = document.getElementById("project-name") as HTMLInputElement
            const ProjectDescription = document.getElementById("project-description") as HTMLInputElement
            const ProjectStatus = document.getElementById("project-status") as HTMLSelectElement
            if (!userToken) {
                 window.location.href="/dashboard"
            } else if (ProjectName.value == "") {
                 ErrorDisplay.innerText="Please insert project name"
            } else if (ProjectDescription.value == "") {
                 ErrorDisplay.innerText="Please insert project description"
            } else if (startDate == undefined) {
                 ErrorDisplay.innerText="Please insert project start date"
            }else if (dueDate == undefined) {
                 ErrorDisplay.innerText="Please insert project due date"
            } else {
                   setButton(true)
            createButton.style.background="#F1F1F1"
            createButton.style.color="#b6b8ba"
            createButton.style.cursor="progress"
            ErrorDisplay.innerText=""
            const sendingToServer = await fetch("/API/cli/project", {
                  method: "post",
                  headers: {
                        "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                        user_token: userToken,
                        Project_id:ProjectId,
                        ProjectName: ProjectName.value,
                        ProjectDescription: ProjectDescription.value,
                        ProjectStartDate: startDate,
                        ProjectDueDate: dueDate,
                        ProjectStatus:ProjectStatus.value

                  })
            })
            createButton.style.background="#0F172A"
            createButton.style.color="white"
            createButton.style.cursor="pointer"
            setButton(false)
            const serverResponse = await sendingToServer.json()
            if (serverResponse.status == 200) {
                  toast.success(serverResponse.message)
            } else {
                  toast.error(serverResponse.message)
            }
           }
      }
      return (<>
            <Toaster/>
            <SideNavBar />
            <div className="adding-project-function ml-[400px] pt-[80px]">
            <div className="adding-task-heading">
                        <h1 className="font-bold text-[20px]">Adding Project</h1>
                        <h1 className="text-[#5f5f5f]">add new project </h1>
                  </div>


                  <div className="adding-project-input-section mt-[50px] grid">
                        <h3 id="error-display" className="mb-[30px] text-red-400"></h3>
                        <input id="project-name" type="text" className="h-[50px] bg-[#f1f1f1] w-[650px] pl-[20px] rounded-[10px] " placeholder="Project Name" />
                        <div className="input mt-[20px]">
                        <ProjectDatePicker date={startDate} onChange={setStartDate} />
                        </div>
                        <div className="input mt-[20px]">
                        <ProjectDueDate date={dueDate} onChange={setDueDate} />
                        </div>
                        <div className="input mt-[20px]">
                              <select id="project-status" className="h-[50px] pr-[50px] bg-[#f1f1f1] w-[650px] pl-[20px] rounded-[10px]">
                                    <option value="in-complete">In Complete</option>
                                    <option value="progress">Progress</option>
                                    <option value="complete">Complete</option>
                                    <option value="paused">Paused</option>
                        </select>
                        </div>
                        <div className="input mt-[20px]">
                        <textarea id="project-description" className="bg-[#f1f1f1] w-[650px] h-[200px] pl-[20px] pt-[25px] rounded-[10px]" placeholder="Description" />
                        </div>
                        <div className="input mt-[20px] flex flex-wrap gap-5">
                        <button onClick={()=>{window.location.href="/dashboard"}} className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[#0F172A] bg-[#f1f1f1]">Cancel</button>
                        <button disabled={buttonBiz} id="button-create-task" onClick={CreatingProject} className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[white] bg-[#0F172A]">Create Project</button>
                        </div>
                  </div>

            </div>
      </>)
}