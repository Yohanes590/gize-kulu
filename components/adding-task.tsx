import SideNavBar from "./client/side-nav"
import SelectionTwo from "./client/selection-2"
import DatePicker from "./client/seletion-3"
import DatePicker2 from "./client/section-4"
import SelectionThree from "./client/todo-listing"
import ProjectSelection from "./client/project-selection"
export default function AddingTaskFunction() {
      return (<>
            <SideNavBar />
            <div className="adding-task-container ml-[400px] pt-[80px]">
                  <div className="adding-task-heading">
                        <h1 className="font-bold text-[20px]">Adding Task</h1>
                        <h1 className="text-[#5f5f5f]">add new task for your project</h1>
                  </div>
                  <div className="input-section mt-[20px]">
                        <div className="flex-input-box flex flex-wrap items-center gap-5">
                        <input className="pl-[20px] h-[50px] rounded-[10px] w-[650px] bg-[#f7f6f6]" type="text" placeholder="Project title" />
                              <SelectionTwo />
                        </div>
                        
                        <div className="flex-input-box mt-[20px] flex flex-wrap items-center gap-5">
                              <DatePicker2 />
                              <DatePicker />
                        </div>
                                   
                        <div className="flex-input-box mt-[20px] flex flex-wrap items-center gap-5">
                              <SelectionThree />
                              <ProjectSelection/>
                        </div>
                        <div className="select-text-area">
                              <textarea className="w-[87%] mt-[20px] pl-[20px] pt-[20px] h-[300px] rounded-[10px] bg-[#f7f6f6]" placeholder="Description"/>
                        </div>
                        <div className="buttons mt-[20px] flex-wrap flex gap-5">
                        <button className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[#0F172A] bg-[#f1f1f1]">Cancel</button>
                        <button className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[white] bg-[#0F172A]">Create Task</button>
                        </div>
                  </div>
            </div>
      </>)
}