"use client"
import { HiOutlineAdjustments } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import  "./style.css"
export default function AboutPage() {
      return <>
      
            <div className="about-container h-[500px]">

                  <div className="about-header text-center">
                        <h1 className="font-bold text-[40px] text-[#5e5e5e]">Main Features </h1>
                        <h3 className="text-[#858585] text-[18px]">Everything you need to simplify your projects and boost productivity</h3>
                  </div>

                  <div className="flex-card-containers flex flex-wrap justify-center gap-3">

                        <div className="each-card-container backdrop-blur-2xl pl-[25px] pt-[40px] mt-[50px] w-[450px] h-[270px] shadow-[0_0_5px_#d6d6d6] rounded-[10px]">
                              <div className="card-message">
                                    <h1 className="font-bold text-[25px]">Smart Task Status Workflow</h1>
                                    <p className="text-[#858585] pt-[5px]">Gize Kulu organizes tasks into clear stages: 
                                    pending, in progress, and completed. This 
                                    helps users stay focused and track their 
                                    progress easily. It promotes time management 
                                    and boosts daily productivity.</p>
                              </div>
                              <div className="card-buttons mt-[15px] pl-[1px] flex items-center justify-between">
                                    <button className="w-[150px] h-[40px] cursor-pointer text-[white] rounded-[10px] bg-[#616EFF] hover:bg-[#4b56ce] transition-all duration-500">Try now</button>
                                    <div className="card-icon w-[50px] h-[50px] flex justify-center items-center text-green-400 rounded-[10px] mr-[40px] bg-green-200">
                                          <HiOutlineAdjustments size={25}/>
                                    </div>
                              </div>  
                        </div>  
                        <div className="each-card-container backdrop-blur-2xl pl-[25px] pt-[40px] mt-[50px] w-[450px] h-[270px] shadow-[0_0_5px_#d6d6d6] rounded-[10px]">
                              <div className="card-message">
                                    <h1 className="font-bold text-[25px]">Secure Authentication</h1>
                                    <p className="text-[#858585] pt-[5px]">The app uses email verification and JWT
                                          tokens with refresh support. It ensures user data is secure and access is managed properly.
                                          This reflects real-world security practices in modern web apps.</p>
                              </div>
                              <div className="card-buttons mt-[15px] pl-[1px] flex items-center justify-between">
                                    <button className="w-[150px] h-[40px] cursor-pointer text-[white] rounded-[10px] bg-[#616EFF] hover:bg-[#4b56ce] transition-all duration-500">Try now</button>
                                    <div className="card-icon w-[50px] h-[50px] flex justify-center items-center text-red-400 rounded-[10px] mr-[40px] bg-red-200">
                                          <FiLock size={25}/>
                                    </div>
                              </div>  
                        </div>  
                        <div className="each-card-container backdrop-blur-2xl pl-[25px] pt-[40px] mt-[50px] w-[450px] h-[270px] shadow-[0_0_5px_#d6d6d6] rounded-[10px]">
                              <div className="card-message">
                                    <h1 className="font-bold text-[25px]">Dashboard & Analytics</h1>
                                    <p className="text-[#858585] pt-[5px]">Gize Kulu includes a clean dashboard with charts and task stats. Users can visualize progress and analyze productivity trends, turning basic task tracking into an insightful user experience</p>
                              </div>
                              <div className="card-buttons mt-[15px] pl-[1px] flex items-center justify-between">
                                    <button className="w-[150px] h-[40px] cursor-pointer text-[white] rounded-[10px] bg-[#616EFF] hover:bg-[#4b56ce] transition-all duration-500">Try now</button>
                                    <div className="card-icon w-[50px] h-[50px] flex justify-center items-center text-orange-400 rounded-[10px] mr-[40px] bg-orange-200">
                                          <MdDashboardCustomize size={25}/>
                                    </div>
                              </div>  
                        </div>  
                  </div>
            </div>
      </>
}