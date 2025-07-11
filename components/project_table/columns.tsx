"use client";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export type Payment = {
  id: string;
  project_name: string;
  project_status: string;
  total_task: any[];
  started_date: string;
  due_date: string;
  action: string;
  actionCenter2: string;
  project_task: any[];
};

async function deleteProject(projectName: string) {
  if (!window.confirm("Are you sure you want to delete this project?")) return;

  const userToken = Cookies.get("access-token");
  if (!userToken) {
    toast.error("You must be logged in to delete a project.");
    return;
  }

  const loadingToastId = toast.loading("Deleting project...");

  try {
    const res = await fetch("/API/cli/project/delete-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: userToken,
        projectName,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Project deleted successfully.", { id: loadingToastId });
      window.location.reload()
    } else {
      toast.error(data.message || "Failed to delete project.", { id: loadingToastId });
    }
  } catch (error: any) {
    console.error(error);
    toast.error("Network error. Please try again.", { id: loadingToastId });
  }
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
    cell: ({ row }) => row.original.project_task?.length ?? 0,
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
    cell: ({ row }) => {
      return (
        <button
          className="bg-red-400 text-white w-[90px] rounded-[10px] cursor-pointer h-[30px]"
          onClick={() => deleteProject(row.original.project_name)}
        >
          Delete
        </button>
      );
    },
  },
  {
    accessorKey: "actionCenter2",
    header: "Edit",
    cell: ({ row }) => {
      return (
        <button
          className="bg-yellow-500 text-white w-[90px] rounded-[10px] cursor-pointer h-[30px]"
          onClick={() =>
            (window.location.href = "/project-details/" + row.original.project_name)
          }
        >
          Edit
        </button>
      );
    },
  },
];
