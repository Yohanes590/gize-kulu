"use client"
import { columns, Payment } from "./table-data/columns"
import { DataTable } from "./table-data/data-table"
import React, { useState } from "react"
export default function DataTableFunction() {


  const data: Payment[] = [
    {
      "id": "7d3f9a2e",
      "task_name": "Refactor Payment Module",
      "status": "In Progress",
      "startDate": "05/03/2024",
      "dueDate": "20/03/2024",
      "action": "",
      "assignProject": "E-Commerce Platform"
    },
    {
      "id": "b4c8e1f6",
      "task_name": "Implement Dark Mode",
      "status": "Pending Review",
      "startDate": "10/03/2024",
      "dueDate": "25/03/2024",
      "action": "",
      "assignProject": "Mobile App Redesign"
    },
    {
      "id": "9a2d5f7c",
      "task_name": "Database Optimization",
      "status": "Completed",
      "startDate": "15/02/2024",
      "dueDate": "28/02/2024",
      "action": "",
      "assignProject": "Backend Services"
    },
    {
      "id": "e6f3b8d1",
      "task_name": "User Profile Redesign",
      "status": "Not Started",
      "startDate": "01/04/2024",
      "dueDate": "15/04/2024",
      "action": "",
      "assignProject": "UI/UX Overhaul"
    },
    {
      "id": "2c7a9e4d",
      "task_name": "API Security Audit",
      "status": "Blocked",
      "startDate": "12/03/2024",
      "dueDate": "30/03/2024",
      "action": "",
      "assignProject": "Security Initiative"
    },
    {
      "id": "5d1f8b3e",
      "task_name": "Mobile Push Notifications",
      "status": "In Development",
      "startDate": "08/03/2024",
      "dueDate": "22/03/2024",
      "action": "",
      "assignProject": "Customer Engagement"
    },
    {
      "id": "f8e2a6d9",
      "task_name": "Analytics Dashboard",
      "status": "QA Testing",
      "startDate": "18/02/2024",
      "dueDate": "05/03/2024",
      "action": "",
      "assignProject": "Business Intelligence"
    },
    {
      "id": "3b6c9d2a",
      "task_name": "Inventory Management",
      "status": "In Progress",
      "startDate": "22/03/2024",
      "dueDate": "10/04/2024",
      "action": "",
      "assignProject": "Warehouse System"
    },
    {
      "id": "d4e7f1c8",
      "task_name": "Multi-language Support",
      "status": "Planning",
      "startDate": "05/04/2024",
      "dueDate": "25/04/2024",
      "action": "",
      "assignProject": "Global Expansion"
    },
    {
      "id": "a9c3e6f2",
      "task_name": "Payment Gateway Integration",
      "status": "In Progress",
      "startDate": "14/03/2024",
      "dueDate": "04/04/2024",
      "action": "",
      "assignProject": "Checkout System"
    },
    {
      "id": "6b2d8f1e",
      "task_name": "Automated Testing Suite",
      "status": "Completed",
      "startDate": "10/02/2024",
      "dueDate": "28/02/2024",
      "action": "",
      "assignProject": "QA Infrastructure"
    },
    {
      "id": "1e9f4d7c",
      "task_name": "Search Algorithm Update",
      "status": "In Development",
      "startDate": "20/03/2024",
      "dueDate": "12/04/2024",
      "action": "",
      "assignProject": "Search Engine"
    },
    {
      "id": "c8a3d6f2",
      "task_name": "Data Migration",
      "status": "Pending",
      "startDate": "25/03/2024",
      "dueDate": "15/04/2024",
      "action": "",
      "assignProject": "Database Upgrade"
    },
    {
      "id": "4f7b2e9d",
      "task_name": "Accessibility Improvements",
      "status": "Not Started",
      "startDate": "01/05/2024",
      "dueDate": "20/05/2024",
      "action": "",
      "assignProject": "Compliance"
    },
    {
      "id": "e2d9a5f1",
      "task_name": "Performance Optimization",
      "status": "In Progress",
      "startDate": "15/03/2024",
      "dueDate": "05/04/2024",
      "action": "",
      "assignProject": "Core Platform"
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