"use client"
import SideNavBar from "./client/side-nav"
import { columns, Payment } from "./project_table/columns"
import { DataTable } from "./project_table/data-table"
import React, { useState } from "react"
export default function ProjectFunction() {


      const data :Payment[]= [
            {
              id: "A1X9TR",
              project_name: "Build Landing Page",
              project_status: "pending",
              total_task: 5,
              started_date: "05/01/2025",
              due_date: "20/01/2025",
              action: ""
            },
            {
              id: "K9L7BD",
              project_name: "Refactor Auth Module",
              project_status: "completed",
              total_task: 2,
              started_date: "15/12/2024",
              due_date: "25/12/2024",
              action: ""
            },
            {
              id: "Z3P6NC",
              project_name: "Fix Payment Bug",
              project_status: "in progress",
              total_task: 4,
              started_date: "10/01/2025",
              due_date: "20/01/2025",
              action: ""
            },
            {
              id: "W8Q4FY",
              project_name: "Deploy Portfolio",
              project_status: "pending",
              total_task: 3,
              started_date: "02/01/2025",
              due_date: "15/01/2025",
              action: ""
            },
            {
              id: "B7E2MV",
              project_name: "Setup CI/CD",
              project_status: "in progress",
              total_task: 6,
              started_date: "28/12/2024",
              due_date: "10/01/2025",
              action: ""
            },
            {
              id: "N6U0PL",
              project_name: "Upgrade Database",
              project_status: "pending",
              total_task: 5,
              started_date: "22/12/2024",
              due_date: "08/01/2025",
              action: ""
            },
            {
              id: "C4T1AX",
              project_name: "Design Admin Dashboard",
              project_status: "completed",
              total_task: 7,
              started_date: "10/12/2024",
              due_date: "30/12/2024",
              action: ""
            },
            {
              id: "J5R8WK",
              project_name: "Integrate Chat Feature",
              project_status: "in progress",
              total_task: 4,
              started_date: "03/01/2025",
              due_date: "13/01/2025",
              action: ""
            },
            {
              id: "V2M7HS",
              project_name: "Optimize Images",
              project_status: "pending",
              total_task: 3,
              started_date: "05/01/2025",
              due_date: "12/01/2025",
              action: ""
            },
            {
              id: "L9Z3QT",
              project_name: "SEO Improvements",
              project_status: "completed",
              total_task: 2,
              started_date: "01/12/2024",
              due_date: "14/12/2024",
              action: ""
            },
            {
              id: "U3X6RB",
              project_name: "Fix Login Issues",
              project_status: "in progress",
              total_task: 4,
              started_date: "29/12/2024",
              due_date: "05/01/2025",
              action: ""
            },
            {
              id: "Q0D5NM",
              project_name: "Create Blog System",
              project_status: "pending",
              total_task: 6,
              started_date: "04/01/2025",
              due_date: "19/01/2025",
              action: ""
            },
            {
              id: "H6E9JG",
              project_name: "User Feedback Module",
              project_status: "completed",
              total_task: 5,
              started_date: "11/12/2024",
              due_date: "23/12/2024",
              action: ""
            },
            {
              id: "F1C7ZL",
              project_name: "Email Notification Setup",
              project_status: "pending",
              total_task: 3,
              started_date: "08/01/2025",
              due_date: "17/01/2025",
              action: ""
            },
            {
              id: "M2K5YD",
              project_name: "Analytics Dashboard",
              project_status: "in progress",
              total_task: 7,
              started_date: "18/12/2024",
              due_date: "09/01/2025",
              action: ""
            }
          ]

      const [ filterData , setFilterData ] = useState<Payment[]>(data)

      const FilterFunction = (changeValue:string) => {
            const filterProjectName = data.filter(project => project.project_name.toLocaleLowerCase().includes(changeValue.toLocaleLowerCase()))
            setFilterData(filterProjectName)
      }
      return (<>
            <SideNavBar />
            
            <div className="projects-container ml-[400px] pt-[80px]">
                  <h1 className="text-[30px] font-bold">Projects</h1>
                  <p className="text-[#b4b4b4]">Manage and filter your projects</p>
                      <div className="search-task-input mt-[20px]">
                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>FilterFunction(e.target.value)} type="text"placeholder="Filer by project name.." className="h-[45px] w-[400px] outline-violet-500 transition-all duration-500 bg-[#e9e9e9] pl-[20px] rounded-[10px]" />
                        </div>
                  <div className="table-component w-[95%]">
                  <div className="container mx-auto py-10 " >
                  <DataTable columns={columns} data={filterData} />
                  </div>
                  </div>

            </div>

      </>)
}