"use client"
import SideNavBar from "./client/side-nav"
import { columns, Payment } from "./project_table/columns"
import { DataTable } from "./project_table/data-table"
import React, { useState, useEffect } from "react"
import Cookie from "js-cookie"
export default function ProjectFunction() {
  
  let data: Payment[] = []
  const [ gettingData , SetData ] = useState<Payment[]>()

  useEffect(() => {
    
    const FetchingProjects = async ():Promise<void> => {
      const user_token = Cookie.get("access-token")
      const sendCookie =await fetch("/API/cli/project/show-projects", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          user_token:user_token
        })
      })
      const ServerData = await sendCookie.json()
      console.log(ServerData)
    }
    FetchingProjects()
    
  },[])


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