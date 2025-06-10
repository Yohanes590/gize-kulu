"use client"
import SideNavBar from "./client/side-nav"
import DataTableFunction from "./client/table"
export default function MyTaskFunction() {
      return (<>
            <SideNavBar />
            <div className="my-task-container ml-[400px] pt-[80px]">
                  <div className="my-task-header">
                  <h1 className="text-[25px] font-bold">My Task</h1>
                  <h1 className="text-[16px] text-[#807d7d]">Details about your task</h1>
                  </div>

                  <div className="main-task-container w-[95%]">
                        <DataTableFunction/>
                  </div>


            </div>
      </>)
}