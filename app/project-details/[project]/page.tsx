"use client";
import { useParams } from "next/navigation";
import SideNavBar from "@/components/client/side-nav";
export default function ClientProjectDetails() {
  const params = useParams();
  const project = params.project as string

  const TaskArrays = [{
    task_name: "some task",
    priority:"complete",
    start_date:"complete"
  }]

  return <>
    <SideNavBar />
    <div className="project-details-container ml-[400px] pt-[150px]">

      <div className="project-name text-[18px] text-[#747474]">
        <p>Project Details / { decodeURI(project) }</p>
        </div>

      


    </div>
  </>;
}
