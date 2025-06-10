"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  task_name: string,
  status: string,
  startDate: string,
  deuDate:string
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
    accessorKey: "deuDate",
    header: "Due Date",
  },
]