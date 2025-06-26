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

import { useEffect } from "react"

export default function ProjectSelection({ ProjectSelectionType, OnProjectChange }:ProjectTypeDefine) {
      return (<>
            <Select value={ProjectSelectionType} onValueChange={OnProjectChange}>
          <SelectTrigger className="w-[650px]" style={{
    height:"50px"
  }}>
    <SelectValue placeholder="Select Project" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="My Test Project">MY TEST PROJECT</SelectItem>
  </SelectContent>
</Select>
      </>)
}