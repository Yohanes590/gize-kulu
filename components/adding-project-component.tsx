import SideNavBar from "./client/side-nav"
import ProjectDatePicker from "./prject-date"
import ProjectDueDate from "./due-projecr-date"
export default function AddingProjectFunction() {
      return (<>
            <SideNavBar />
            <div className="adding-project-function ml-[400px] pt-[80px]">
            <div className="adding-task-heading">
                        <h1 className="font-bold text-[20px]">Adding Project</h1>
                        <h1 className="text-[#5f5f5f]">add new project </h1>
                  </div>


                  <div className="adding-project-input-section mt-[50px] grid">
                        <input type="text" className="h-[50px] bg-[#f1f1f1] w-[650px] pl-[20px] rounded-[10px] " placeholder="Project Name" />
                        <div className="input mt-[20px]">
                        <ProjectDatePicker />
                        </div>
                        <div className="input mt-[20px]">
                        <ProjectDueDate />
                        </div>
                        <div className="input mt-[20px]">
                        <textarea className="bg-[#f1f1f1] w-[650px] h-[200px] pl-[20px] pt-[25px] rounded-[10px]" placeholder="Description" />
                        </div>
                        <div className="input mt-[20px] flex flex-wrap gap-5">
                        <button className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[#0F172A] bg-[#f1f1f1]">Cancel</button>
                        <button className="w-[150px] cursor-pointer h-[45px] rounded-[10px] text-[white] bg-[#0F172A]">Create Project</button>
                        </div>
                  </div>

            </div>
      </>)
}