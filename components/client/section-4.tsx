"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DateType = {
  date: Date | undefined,
  onChange:(date : Date | undefined) => void
}

export default function DatePicker2({ date , onChange }:DateType) { 
     
      const [open, setOpen] = React.useState(false)
      return (
        <div className="flex flex-col gap-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-[650px] justify-between font-normal"
                style={{
                  height:"50px"
                }}
              >
                {date ? date.toLocaleDateString() : "Started date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  onChange(date)
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
            </div>
      )
}