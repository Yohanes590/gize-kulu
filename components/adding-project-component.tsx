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
            const createButton = document.getElementById("button-create-task") as HTMLElement
            const userToken = Cookie.get("access-token")
            const ProjectName = document.getElementById("project-name") as HTMLInputElement
            const ProjectDescription = document.getElementById("project-description") as HTMLInputElement
            setButton(true)
            createButton.style.background="#F1F1F1"
            createButton.style.color="black"
            createButton.style.cursor="progress"
            const sendingToServer = await fetch("/API/cli/project", {
                  method: "post",
                  headers: {
                        "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                        user_token: userToken,
                        ProjectName: ProjectName.value,
                        ProjectDescription: ProjectDescription.value,
                        ProjectStartDate: startDate,
                        ProjectDueDate: dueDate,
                  })
            })
            createButton.style.background="#0F172A"
            createButton.style.color="white"
            createButton.style.cursor="pointer"
            setButton(false)
            const serverResponse = await sendingToServer.json()
            if (serverResponse.status == 200) {
                  
            }
            console.log(serverResponse)
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
                        <input id="project-name" type="text" className="h-[50px] bg-[#f1f1f1] w-[650px] pl-[20px] rounded-[10px] " placeholder="Project Name" />
                        <div className="input mt-[20px]">
                        <ProjectDatePicker date={startDate} onChange={setStartDate} />
                        </div>
                        <div className="input mt-[20px]">
                        <ProjectDueDate date={dueDate} onChange={setDueDate} />
                        </div>
                        <div className="input mt-[20px]">
                        <textarea id="project-description" className="bg-[#f1f1f1] w-[650px] h-[200px] pl-[20px] pt-[25px] rounded-[10px]" placeholder="Description" />
                        </div>
                        <div className="input mt-[20px] flex flex-wrap gap-5">
                        <button className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[#0F172A] bg-[#f1f1f1]">Cancel</button>
                        <button disabled={buttonBiz} id="button-create-task" onClick={CreatingProject} className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[white] bg-[#0F172A]">Create Project</button>
                        </div>
                  </div>

            </div>
      </>)
}