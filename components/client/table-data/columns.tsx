"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  task_name: string,
  status: string,
  startDate: string,
  dueDate: string,
  action:string,
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "task_name",
    header: "Task Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "startDate",
    header: "Started Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({row}) => {
      return (<>
        <button className="bg-red-400 text-white w-[90px] cursor-pointer h-[30px]" onClick={()=>console.log(row.original.id)}>Delete</button>
      </>)
    }
  },
]