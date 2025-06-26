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
    <SelectItem value="TO DO">TO DO</SelectItem>
    <SelectItem value="IN PROGRESS">IN PROGRESS</SelectItem>
    <SelectItem value="COMPLETE">COMPLETE</SelectItem>
    <SelectItem value="LEAVED">LEAVED</SelectItem>
  </SelectContent>
</Select>
      </>)
}