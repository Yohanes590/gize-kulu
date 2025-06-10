import { columns, Payment } from "./table-data/columns"
import { DataTable } from "./table-data/data-table"
import React, { useState } from "react"
export default function DataTableFunction() {


const data:Payment[] =    [{
  id: "728ed52f",
  task_name: "Making React App",
  status: "Pending...",
  startDate: "20/12/2025",
  deuDate:"20/20/2026"
  }]



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