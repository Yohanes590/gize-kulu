import { columns, Payment } from "./table-data/columns"
import { DataTable } from "./table-data/data-table"
import React, { useState } from "react"
export default function DataTableFunction() {


  const data: Payment[] = [
  {
    "id": "a1b2c3d4",
    "task_name": "Implement User Authentication",
    "status": "In Progress",
    "startDate": "15/01/2024",
    "dueDate": "30/01/2024",
    "action": ""
  },
  {
    "id": "e5f6g7h8",
    "task_name": "Design Dashboard UI",
    "status": "Completed",
    "startDate": "10/01/2024",
    "dueDate": "25/01/2024",
    "action": ""
  },
  {
    "id": "i9j0k1l2",
    "task_name": "Fix API Endpoints",
    "status": "Pending",
    "startDate": "20/01/2024",
    "dueDate": "05/02/2024",
    "action": ""
  },
  {
    "id": "m3n4o5p6",
    "task_name": "Write Documentation",
    "status": "Not Started",
    "startDate": "01/02/2024",
    "dueDate": "15/02/2024",
    "action": ""
  },
  {
    "id": "q7r8s9t0",
    "task_name": "Optimize Database Queries",
    "status": "In Progress",
    "startDate": "18/01/2024",
    "dueDate": "28/01/2024",
    "action": ""
  },
  {
    "id": "u1v2w3x4",
    "task_name": "Create Unit Tests",
    "status": "Blocked",
    "startDate": "22/01/2024",
    "dueDate": "10/02/2024",
    "action": ""
  },
  {
    "id": "y5z6a7b8",
    "task_name": "Deploy to Staging",
    "status": "Pending",
    "startDate": "25/01/2024",
    "dueDate": "05/02/2024",
    "action": ""
  },
  {
    "id": "c9d0e1f2",
    "task_name": "Review Pull Requests",
    "status": "In Progress",
    "startDate": "12/01/2024",
    "dueDate": "19/01/2024",
    "action": ""
  },
  {
    "id": "g3h4i5j6",
    "task_name": "Update Dependencies",
    "status": "Completed",
    "startDate": "05/01/2024",
    "dueDate": "12/01/2024",
    "action": ""
  },
  {
    "id": "k7l8m9n0",
    "task_name": "Create Analytics Dashboard",
    "status": "Not Started",
    "startDate": "30/01/2024",
    "dueDate": "15/02/2024",
    "action": ""
  },
  {
    "id": "o1p2q3r4",
    "task_name": "Fix Mobile Responsiveness",
    "status": "In Progress",
    "startDate": "17/01/2024",
    "dueDate": "31/01/2024",
    "action": ""
  },
  {
    "id": "s5t6u7v8",
    "task_name": "Implement Dark Mode",
    "status": "Pending",
    "startDate": "22/01/2024",
    "dueDate": "08/02/2024",
    "action": ""
  },
  {
    "id": "w9x0y1z2",
    "task_name": "Conduct User Testing",
    "status": "Scheduled",
    "startDate": "05/02/2024",
    "dueDate": "20/02/2024",
    "action": ""
  },
  {
    "id": "a3b4c5d6",
    "task_name": "Refactor Legacy Code",
    "status": "In Progress",
    "startDate": "10/01/2024",
    "dueDate": "30/01/2024",
    "action": ""
  },
  {
    "id": "e7f8g9h0",
    "task_name": "Setup CI/CD Pipeline",
    "status": "Completed",
    "startDate": "03/01/2024",
    "dueDate": "15/01/2024",
    "action": ""
  },
  {
    "id": "i1j2k3l4",
    "task_name": "Create Admin Panel",
    "status": "Pending",
    "startDate": "25/01/2024",
    "dueDate": "10/02/2024",
    "action": ""
  },
  {
    "id": "m5n6o7p8",
    "task_name": "Implement Payment Gateway",
    "status": "In Progress",
    "startDate": "15/01/2024",
    "dueDate": "05/02/2024",
    "action": ""
  },
  {
    "id": "q9r0s1t2",
    "task_name": "Write API Documentation",
    "status": "Not Started",
    "startDate": "28/01/2024",
    "dueDate": "12/02/2024",
    "action": ""
  },
  {
    "id": "u3v4w5x6",
    "task_name": "Optimize Frontend Performance",
    "status": "Scheduled",
    "startDate": "08/02/2024",
    "dueDate": "22/02/2024",
    "action": ""
  },
  {
    "id": "y7z8a9b0",
    "task_name": "Conduct Security Audit",
    "status": "Pending",
    "startDate": "20/01/2024",
    "dueDate": "10/02/2024",
    "action": ""
  }
]


  const [filterObj, setFilterObj] = useState<Payment[]>(data);
    
const findingDataFromTable = (inputValue: string) => {
  const FilterData = data.filter(projectName => projectName.task_name.toLowerCase().includes(inputValue.toLowerCase()))
  setFilterObj(FilterData)
  console.log(filterObj) 
}
  
  return (<>
    
    <div className="search-task-input mt-[20px]">
      <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>findingDataFromTable(e.target.value)} placeholder="Filer by task name.." className="h-[45px] w-[400px] outline-violet-500 transition-all duration-500 bg-[#e9e9e9] pl-[20px] rounded-[10px]" />
      </div>
    
        <div className="container mx-auto pt-[20px]">
      <DataTable columns={columns} data={filterObj} />
    </div>

    <h1 id="html"></h1>
  </>)

}