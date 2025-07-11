"use client"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select"
   
type SelectionType = {
  selectValue: string;
  valueChange: (selectValue:string) =>void
}

export default function SelectionThree({selectValue , valueChange}:SelectionType) {
      return (<>
            <Select value={selectValue} onValueChange={valueChange}>
          <SelectTrigger className="w-[650px]" style={{
    height:"50px"
  }}>
    <SelectValue placeholder="Select Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="progress">IN PROGRESS</SelectItem>
    <SelectItem value="complete">COMPLETE</SelectItem>
    <SelectItem value="in-complete">IN COMPLETE</SelectItem>
    <SelectItem value="paused">PAUSE</SelectItem>
  </SelectContent>
</Select>
      </>)
}