"use client"
import { useParams } from "next/navigation"
import SideNavBar from "@/components/client/side-nav"
export default function EditProject() {
      const params = useParams()
      const projectId = params.id as string
      return <>
            <SideNavBar />
            <div className="container-edit-project ml-[400px] pt-[100px]">
                  <div className="heading-project text-[18]">
                        <h1>Edit Project / <span className="text-blue-500">{ decodeURI(projectId) }</span></h1>
                  </div>
                  <div className="input-section mt-[50px]">
                        <div className="span-hover mb-[30px]">
                              <p>Project Name</p>
                        <input className="w-[500px] h-[50px] pl-[15px] outline-1 outline-blue-500 mt-[10px] bg-[#f0f0f0]" type="text" placeholder="making some thing *" />
                        </div>
                        <div className="span-hover mb-[30px]">
                              <p>Started Date</p>
                        <input type="date" className="w-[500px] h-[50px] outline-1 outline-blue-500 pl-[15px] mt-[10px] bg-[#f0f0f0]" />
                        </div>
                        <div className="span-hover mb-[30px]">
                              <p>Due Date</p>
                        <input type="date" className="w-[500px] h-[50px] outline-1 outline-blue-500 pl-[15px] mt-[10px] bg-[#f0f0f0]" />
                        </div>

                         <div className="span-hover mb-[30px]">
                        <p>Started Date</p>
                              <select className="w-[500px] h-[50px] outline-1 outline-blue-500 pl-[15px] mt-[10px] bg-[#f0f0f0]">
                                    <option>In Complete</option>
                                    <option>Process</option>
                                    <option>Complete</option>
                                    <option>Paused</option>
                        </select>
                        </div>
                        

                  <div className="span-hover">
                        <p>Project Description</p>
                                    <textarea className="w-[500px] h-[200px] outline-1 outline-blue-500 pl-[15px] mt-[10px] bg-[#f0f0f0] pt-[15px]" placeholder="This project ....."></textarea>
                        </div>

                                <div className="span-hover mb-[30px]">
                        <button className="bg-amber-400 w-[500px] h-[45px] cursor-pointer">Save Changes</button>
                        </div>

                  </div>
                  
            </div>
            
      </>
}