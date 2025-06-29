"use client"
import { useParams } from "next/navigation"
export default function EditTaskInfo() {
      const params = useParams()
      const fetchPrams = params.id as string
      return <>
            <div className="editing-task-part ml-[400px] mt-[150px]">
                  <div className="editing-task-container">
                        <input type="text" placeholder="Task name" className="w-[350px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]" />
                        <input type="text" placeholder="Task name" className="w-[350px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]" />
                         </div>
        </div>
      </>
}