"use client"
import { FaFolder } from "react-icons/fa";
import SideNavBar from "./client/side-nav"
import { MdTask } from "react-icons/md";
import { SiTask } from "react-icons/si";
import ChartFunction from "./client/chart-segment";
import ChartFunction2 from "./client/chart-segment-2";
export default function Dashboard() {
      return (<>
            <SideNavBar />
            <div className="dashboard-container flex ml-[400px] pt-[80px] items-center">

                  <div className="dashboard-card-container">
                        <div className="header-section">
                              <h1 className="text-[25px] font-bold">Dashboard</h1>
                              <h1 className="text-[16px] text-[#807d7d]">Monitor your workspace activities and projects</h1>
                        </div>
                        <div className="flex-card-section-dashboard flex flex-wrap gap-5">

                        <div className="each-dashboard-card flex items-center justify-between pl-[20px] w-[350px] rounded-[10px] h-[120px] mt-[20px] shadow-[0_0_3px_#cecece]">
                                    <div className="card-titles">
                                          <p className="text-[#6e6e6e]">Total Projects</p>
                                          <p className="text-[30px] font-bold">10</p>
                                    </div>
                                    <div className="icon-symbol text-[var(--blue-color)] pr-[30px]">
                                          <FaFolder  size={25}/>  
                                    </div>
                              </div>

                              <div className="each-dashboard-card flex items-center justify-between pl-[20px] w-[350px] rounded-[10px] h-[120px] mt-[20px] shadow-[0_0_3px_#cecece]">
                                    <div className="card-titles">
                                          <p className="text-[#6e6e6e]">Total Task</p>
                                          <p className="text-[30px] font-bold">20</p>
                                    </div>
                                    <div className="icon-symbol text-orange-500 pr-[30px]">
                                          <MdTask  size={25}/>  
                                    </div>
                              </div>

                              <div className="each-dashboard-card flex items-center justify-between pl-[20px] w-[350px] rounded-[10px] h-[120px] mt-[20px] shadow-[0_0_3px_#cecece]">
                                    <div className="card-titles">
                                          <p className="text-[#6e6e6e]">Completed Task</p>
                                          <p className="text-[30px] font-bold">14</p>
                                    </div>
                                    <div className="icon-symbol text-green-500 pr-[30px]">
                                          <SiTask  size={25}/>  
                                    </div>
                              </div>

                              <div className="each-dashboard-card flex items-center justify-between pl-[20px] w-[350px] rounded-[10px] h-[120px] mt-[20px] shadow-[0_0_3px_#cecece]">
                                    <div className="card-titles">
                                          <p className="text-[#6e6e6e]">Completed Projects</p>
                                          <p className="text-[30px] font-bold">2</p>
                                    </div>
                                    <div className="icon-symbol text-blue-500 pr-[30px]">
                                          <FaFolder  size={25}/>  
                                    </div>
                              </div>

                              </div>
                  

                  </div>

            </div>
            <div className="chart-section-card flex flex-wrap gap-5 ml-[400px]">

                        <div className="each-chart-card mt-[40px] rounded-[10px] shadow-[0_0_3px_#cecece] w-[720px] h-[500px]">
                        <div className="chart-header pt-[20px] pl-[30px]">
                              <h1 className="font-bold text-[25px]" >Monthly task progress</h1>
                        </div>
                        <div className="chart">
                              <ChartFunction/>
                        </div>
                  </div>
                  
                  
                  <div className="each-chart-card mt-[40px] rounded-[10px] shadow-[0_0_3px_#cecece] w-[720px] h-[500px]">
                        <div className="chart-header pt-[20px] pl-[30px]">
                              <h1 className="font-bold text-[25px]" >Monthly project progress</h1>
                        </div>
                        <div className="char">
                              <ChartFunction2/>
                        </div>
                        </div>

</div>
      </>)
}