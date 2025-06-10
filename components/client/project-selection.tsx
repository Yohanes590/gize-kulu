"use client"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select"
export default function ProjectSelection() {
      return (<>
            <Select>
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