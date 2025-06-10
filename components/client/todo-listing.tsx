"use client"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select"
export default function SelectionThree() {
      return (<>
            <Select>
          <SelectTrigger className="w-[650px]" style={{
    height:"50px"
  }}>
    <SelectValue placeholder="Select Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="TO DO">TO DO</SelectItem>
    <SelectItem value="IN PROGRESS">IN PROGRESS</SelectItem>
    <SelectItem value="COMPLETE">COMPLETE</SelectItem>
    <SelectItem value="LEAVED">LEAVED</SelectItem>
  </SelectContent>
</Select>
      </>)
}