"use client"

import { ColumnDef } from "@tanstack/react-table"
export type Payment = {
  id: string
  project_name: string,
  project_status: string,
  total_task: any[],
  started_date: string,
  due_date: string,
  action: string,
  actionCenter2:string,
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "project_name",
    header: "Project Name",

  },
  {
    accessorKey: "project_status",
    header: "Project Status",
  },
  {
    accessorKey: "total_task",
    header: "Total Task",
    cell: ({ row }) => row.original.total_task?.length??0
  },
  {
    accessorKey: "due_date",
    header: "Started Date",
  },
  {
    accessorKey: "started_date",
    header: "Due Date",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({row}) => {
     return( <button className="bg-red-400 text-white w-[90px] rounded-[10px] cursor-pointer h-[30px]" onClick={()=>console.log(row.original.project_name)}>Delete</button>)
    }
  },
    {
    accessorKey: "actionCenter2",
    header: "Edit",
    cell: ({row}) => {
     return( <button className="bg-yellow-500 text-white w-[90px] rounded-[10px] cursor-pointer h-[30px]" onClick={()=>window.location.href="/project-details/"+row.original.project_name}>Edit</button>)
    }
  },
  
]