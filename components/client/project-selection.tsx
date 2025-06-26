"use client"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select"
   
type ProjectTypeDefine = {
  ProjectSelectionType: string,
  OnProjectChange:(ProjectSelectionType:string)=>void
}

import { useEffect , useState } from "react"
import Cookies from "js-cookie"
export default function ProjectSelection({ ProjectSelectionType, OnProjectChange }: ProjectTypeDefine) {

  type ProjectNameType = {
    project_name:string
  }
  const [ projectArray , setProjectArray ] = useState<ProjectNameType[]>()
  useEffect(() => {
    const gettingProjectsFunction = async () => {
      const gettingToken = Cookies.get("access-token")
      const sendCookie = await fetch("/API/cli/project/show-projects", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          user_token:gettingToken,
        })
      })
      const serverResponse = await sendCookie.json()
      setProjectArray(serverResponse)
    }
    gettingProjectsFunction()
  },[])
      return (<>
            <Select value={ProjectSelectionType} onValueChange={OnProjectChange}>
          <SelectTrigger className="w-[650px]" style={{
    height:"50px"
  }}>
    <SelectValue placeholder="Select Project" />
  </SelectTrigger>
          <SelectContent>
            {projectArray?.length === 0 ? (
    null
            ) : (
                projectArray?.map((projectItems) =>
                <SelectItem key={projectItems.project_name} value={projectItems.project_name}>{projectItems.project_name}</SelectItem>)
            )}
  </SelectContent>
</Select>
      </>)
}