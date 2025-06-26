"use client"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select"
    
type selectValueType = {
  priority: string,
  setPriority:(priority:string)=>void
}

export default function SelectionTwo({priority , setPriority}:selectValueType) {
      return (<>
<Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-[650px] h-10 px-3 py-2 text-sm" style={{
    height:"50px"
  }}>
    <SelectValue placeholder="Select Priority" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Low</SelectItem>
    <SelectItem value="medium">Medium</SelectItem>
    <SelectItem value="high">High</SelectItem>
  </SelectContent>
</Select>


      </>)
}