"use client"
import { useParams } from "next/navigation"
export default function EditTaskInfo() {
      const params = useParams()
      const fetchPrams = params.id as string
      return <>
            <div className="editing-task-part ml-[400px] mt-[150px]">
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
                                    <p>Start date</p>
                                     <input type="date"  className=" w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"/>
                              </div>
                        </div>
                  </div>
        </div>
      </>
}