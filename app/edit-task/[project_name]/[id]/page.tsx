"use client"
import { useParams } from "next/navigation";
import SideNavBar from "@/components/client/side-nav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

export default function EditTaskInfo() {
  const params = useParams();
  const fetchPrams = params.id as string;
  const fetchProjectName = params.project_name as string;

  const [TaskName, setTaskName] = useState<string>("");
  const [Priority, setPriority] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [progress, setProgress] = useState<string>("IN PROGRESS");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchTaskInformation = async () => {
      const user_token = Cookies.get("access-token");
      if (!user_token) {
        toast.error("You must be logged in");
        return;
      }
      const loadingInputField = toast.loading("Loading task...");
      try {
        const sendingToken = await fetch("/API/cli/project/project-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_token }),
        });
        toast.dismiss(loadingInputField);
        const server_response = await sendingToken.json();

        const project = server_response.find(
          (proj: any) => proj.project_name === decodeURI(fetchProjectName)
        );
        if (!project) {
          toast.error("Project not found");
          return;
        }

        const filterProjectTask = project.project_task.filter(
          (task: { id: string }) => task.id === fetchPrams
        );
        if (!filterProjectTask.length) {
          toast.error("Task not found");
          return;
        }

        const task = filterProjectTask[0];
        setTaskName(task.task_name);
        setPriority(task.project_priority);
        setStartDate(new Date(task.start_date).toISOString().slice(0, 10));
        setDueDate(new Date(task.due_date).toISOString().slice(0, 10));
        setProgress(task.status);
        setDescription(task.title_description);
      } catch (_error:unknown) {
        toast.dismiss(loadingInputField);
        toast.error("Failed to load task information");
      }
    };
    fetchTaskInformation();
  }, [fetchPrams, fetchProjectName]);

  const submitEditedTask = async () => {
    // Simple validation for blank inputs
    if (!TaskName.trim()) {
      toast.error("Task name cannot be empty");
      return;
    }
    if (!Priority.trim()) {
      toast.error("Priority must be selected");
      return;
    }

    const User_Token = Cookies.get("access-token");
    if (!User_Token) {
      toast.error("You must be logged in");
      return;
    }

    const updates = {
      task_name: TaskName,
      project_priority: Priority,
      status: progress,
      start_date: startDate ? new Date(startDate).toISOString() : undefined,
      due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
      title_description: description,
    };

    const loading = toast.loading("Updating task...");
    try {
      const res = await fetch("/API/cli/task/editing-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_token: User_Token,
          projectName: decodeURI(fetchProjectName),
          taskId: fetchPrams,
          updates,
        }),
      });
      const data = await res.json();
      toast.dismiss(loading);

      if (res.ok) {
        toast.success("Task updated successfully");
      } else {
        toast.error(data.message || "Failed to update task");
      }
    } catch (error:unknown) {
      toast.dismiss(loading);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <SideNavBar />
      <div className="editing-task-part ml-[400px] pt-[150px]">
        <div className="title-message mb-[20px]">
          <p>
            Edit Task / {decodeURI(fetchProjectName)} /{" "}
            <span className="text-blue-600">{fetchPrams}</span> / {TaskName}
          </p>
        </div>

        <div className="editing-task-container">
          <div className="each-input-section mb-[20px] flex flex-wrap gap-5">
            <input
              type="text"
              value={TaskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task title"
              className="task-title w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"
            />
            <select
              value={Priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="each-input-section flex flex-wrap gap-5">
            <div className="label">
              <p>Start date</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="start-date w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"
              />
            </div>
            <div className="label">
              <p>Due date</p>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="dueDate w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"
              />
            </div>
          </div>

          <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
            <div className="label">
              <p>Select Status</p>
              <select
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="task-status mt-[10px] w-[550px] h-[40px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"
              >
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="COMPLETE">COMPLETE</option>
                <option value="IN COMPLETE">IN COMPLETE</option>
                <option value="PAUSE">PAUSE</option>
              </select>
            </div>
          </div>

          <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              className="task-description mt-[10px] pt-[20px] w-[1130px] h-[250px] pl-[20px] outline-1 outline-blue-500 bg-[#f1f1f1]"
            ></textarea>
          </div>

          <div className="each-input-section mt-[20px] flex flex-wrap gap-5">
            <button
              onClick={submitEditedTask}
              className="mt-[20px] h-[40px] bg-blue-500 w-[200px] cursor-pointer text-white"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
