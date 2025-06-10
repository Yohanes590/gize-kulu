import SideNavBar from "./client/side-nav"
export default function AddingTaskFunction() {
      return (<>
            <SideNavBar />
            <div className="adding-task-container ml-[400px] pt-[80px]">
                  <div className="adding-task-heading">
                        <h1 className="font-bold text-[20px]">Adding Task</h1>
                        <h1 className="text-[#5f5f5f]">add new task for your project</h1>
                  </div>
            </div>
      </>)
}