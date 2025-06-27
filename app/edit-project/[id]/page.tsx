"use client"
import { useParams } from "next/navigation"
import { useState } from "react"
import SideNavBar from "@/components/client/side-nav"
export default function EditProject() {
      const params = useParams()
      const projectId = params.id as string
      return <>
            <SideNavBar />
            <div className="container-edit-project ml-[400px] pt-[200px]">
                  <div className="heading-project text-[18]">
                        <h1>Edit Project / <span className="text-blue-500">{ decodeURI(projectId) }</span></h1>
                  </div>
            </div>
            
      </>
}