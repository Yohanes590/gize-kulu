"use client";
import { useParams } from "next/navigation";
import SideNavBar from "@/components/client/side-nav";
export default function ClientProjectDetails() {
  const params = useParams();
  const project = params.project as string

  const TaskArrays = [{
    task_name: "some task",
    priority:"complete",
    start_date: "20/02/2024",
    due_date: "02/12/2025",
    title_description:"some description"
  }]

  return <>
    <SideNavBar />
    <div className="project-details-container ml-[400px] pt-[150px]">

      <div className="project-name text-[18px] text-[#747474]">
        <p>Project Details / { decodeURI(project) }</p>
        </div>

      <div className="table-card mt-[50px]">

        <div className="each-table-card w-[90%] cursor-pointer rounded-[10px] h-[200px] shadow-[0_0_5px_#747474]">

          <div className="inner-part pl-[20px] pt-[20px]">
          <h1 className=" text-[#252525] text-[20px] ">Title Name</h1>
          <p className="pt-[10px]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugit nostrum quisquam dolorum corporis et eveniet in ipsa rem ab nam,
            sint, optio vitae, assumenda labore voluptas beatae itaque nemo hic.</p>
          </div>
    
          
        </div>


      </div>

    </div>
  </>;
}
