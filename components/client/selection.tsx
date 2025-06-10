"use client"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select"
export default function Selection() {
      return (<>
      <Select>
  <SelectTrigger className="w-[95%]">
    <SelectValue placeholder="My Test WorkSpace" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">My Test WorkSpace</SelectItem>
  </SelectContent>
</Select>
      </>)
}