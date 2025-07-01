"use client"
import { useParams } from "next/navigation"
import SideNavBar from "@/components/client/side-nav"
import { useEffect } from "react"
import Cookies from "js-cookie"
export default function EditTaskInfo() {
      const params = useParams()
      const fetchPrams = params.id as string
      const fetchProjectName = params.project_name as string
      useEffect(() => {

      const fetchTaskInformation = async () => {
      const user_token = Cookies.get("access-token")
      const sendingToken = await fetch("/API/cli/project/project-task", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          user_token:user_token,
        })
      })
            const server_response = await sendingToken.json()
            console.log(server_response)
      }  
      fetchTaskInformation()
      },[])

      return <>
            <SideNavBar/>
            <div className="editing-task-part ml-[400px] pt-[150px]">

                  <div className="title-message mb-[20px]">
                        <p>Edit Task / { decodeURI(fetchProjectName)} / <span className="text-blue-600">{ fetchPrams }</span> / task name </p>
                  </div>

                  <div className="editing-task-container">
                        <div className="each-input-section mb-[20px] flex flex-wrap gap-5">
                        <input type="text" placeholder="Task title" className="w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]" />
                        <select className=" w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]">
                              <option value="low">Select Priority</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                        </select>
                        </div>

                        <div className="each-input-section flex flex-wrap gap-5">
                              <div className="label">
                                    <p>Start date</p>
                                     <input type="date"  className=" w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"/>
                              </div>
                              <div className="label">
                                    <p>Due date</p>
                                     <input type="date"  className=" w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"/>
                              </div>
                        </div>
                        
                        <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
                              <div className="label">
                                    <p>Select Status</p>
                                    <select className="mt-[10px] w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]">
                                          <option value="">Progress</option>
                                          <option value="">Compete</option>
                                          <option value="">Incomplete</option>
                                          <option value="">Pause</option>
                                    </select>
                        </div>
                        </div>
                        
                        <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
                              <textarea placeholder="description" className="mt-[10px] pt-[20px] w-[1130px] h-[250px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"></textarea>
                              </div>
                        <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
                        <button className="mt-[20px] h-[40px] bg-blue-500 w-[200px] cursor-pointer text-white">Save changes</button>
                        </div>
                  </div>
        </div>
      </>
}