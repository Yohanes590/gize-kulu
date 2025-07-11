"use client"
import SideNavBar from "./client/side-nav"
import SelectionTwo from "./client/selection-2"
import DatePicker from "./client/seletion-3"
import DatePicker2 from "./client/section-4"
import SelectionThree from "./client/todo-listing"
import ProjectSelection from "./client/project-selection"
import {  toast } from 'react-hot-toast'
import { useState} from "react"
import Cookies from "js-cookie"
export default function AddingTaskFunction() {

      const [ dueDateValue, setDueDate ] = useState<Date | undefined>()
      const [ startDate, setStartDate ] = useState<Date | undefined>()
      const [ selectionValue , setSelectionValue ] = useState<string>('')
      const [ gettingProjectName, setProjectName ] = useState<string>('')
      const [ priority , setPriority ] = useState<string>('')
      const [ disableButton , setButton ] = useState<boolean>(false)
      const AddingTask = async () => {
      const userToken = Cookies.get("access-token")
      const TaskName = document.getElementById("task-name") as HTMLInputElement
            const TaskDes = document.getElementById("task-des") as HTMLInputElement
            const displayErrors = document.querySelector(".task-display") as HTMLElement
            const task_button_element = document.querySelector(".task-button-element") as HTMLButtonElement
                  if (TaskName.value === '') {
                        displayErrors.innerText = ' task name missing'
                  } else if (priority == '') {
                        displayErrors.innerText = 'select priority level'
                  } else if (startDate === undefined) {
                        displayErrors.innerText = ' started date missing'
                  } else if (dueDateValue === undefined) {
                        displayErrors.innerText = ' due date missing'
                  } else if (selectionValue === "") {
                        displayErrors.innerText = ' select status'
                  } else if (gettingProjectName === '') {
                        displayErrors.innerText = ' project name missing '
                  } else if (TaskDes.value === "") {
                        displayErrors.innerText = ' project description missing '
                  } else {
            setButton(true)
            task_button_element.style.background="#F1F1F1"
            task_button_element.style.color="#b6b8ba"
                        task_button_element.style.cursor = "progress"
                        const TaskId = Math.random().toString(36).slice(2)
                         const AddingTask = await fetch("/API/cli/task/adding-task", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        }, 
                               body: JSON.stringify({
                              id:TaskId,
                              task_name: TaskName.value,
                              status: selectionValue,
                              start_date: startDate,
                              due_date: dueDateValue,
                              title_description: TaskDes.value,
                              user_Token:userToken,
                              project_name: gettingProjectName,
                              project_priority:priority
                        })
                         })  
            setButton(false)
            task_button_element.style.background="#0F172A"
            task_button_element.style.color="white"
            task_button_element.style.cursor="pointer"
                        displayErrors.innerText = ' '
                        const ServerResponse = await AddingTask.json()
                        if (ServerResponse.status == 200) {
                              toast.success("task has been created successfully")
                        } else {
                              toast.error("Task could not be created")
                        }
                  console.log(ServerResponse)
                  }
            }

      return (<>
            <SideNavBar />
            <div className="adding-task-container ml-[400px] pt-[80px]">
                  <div className="adding-task-heading">
                        <h1 className="font-bold text-[20px]">Adding Task</h1>
                        <h1 className="text-[#5f5f5f]">add new task for your project</h1>
                        <h1 className="task-display text-red-400 mt-[10px]"></h1>
                  </div>
                  <div className="input-section mt-[20px]">
                        <div className="flex-input-box flex flex-wrap items-center gap-5">
                        <input id="task-name" className="pl-[20px] h-[50px] rounded-[10px] w-[650px] bg-[#f7f6f6]" type="text" placeholder="Task title" />
                              <SelectionTwo priority={priority} setPriority={setPriority} />
                        </div>
                        
                        <div className="flex-input-box mt-[20px] flex flex-wrap items-center gap-5">
                              <DatePicker2 date={startDate} onChange={setStartDate} />
                              <DatePicker date={dueDateValue} onChange={setDueDate} />
                        </div>
                                   
                        <div className="flex-input-box mt-[20px] flex flex-wrap items-center gap-5">
                              <SelectionThree selectValue={selectionValue} valueChange={setSelectionValue}/>
                              <ProjectSelection ProjectSelectionType={gettingProjectName} OnProjectChange={setProjectName}/>
                        </div>
                        <div className="select-text-area">
                              <textarea id="task-des" className="w-[87%] mt-[20px] pl-[20px] pt-[20px] h-[300px] rounded-[10px] bg-[#f7f6f6]" placeholder="Description"/>
                        </div>
                        <div className="buttons mt-[20px] flex-wrap flex gap-5">
                        <button className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[#0F172A] bg-[#f1f1f1]">Cancel</button>
                        <button disabled={disableButton} className="task-button-element w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[white] bg-[#0F172A]" onClick={AddingTask}>Create Task</button>
                        </div>
                  </div>
            </div>
      </>)
}