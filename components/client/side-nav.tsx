import { IoAdd ,IoSettings } from "react-icons/io5";
import Selection from "./selection";
import { MdSpaceDashboard  ,MdFormatListBulletedAdd ,MdOutlinePlaylistAdd} from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { FaDiagramProject } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
export default function SideNavBar() {
      return (<>
            <div className="side-nav-container w-[350px] h-[100%] fixed cursor-default z-40 shadow-[0_0_5px_#bfbfbf]">
                  <div className="sub-container pt-[50px] ">
                        
                        <div className="logo-space">
                              <h1 className="font-bold text-[25px]">GIZE <span className="text-[var(--blue-color)]">KULU</span></h1>
                              <div className="sub-title-section cursor-pointer pl-[10px] mt-[20px] duration-100 transition h-[50px] w-[100%] hover:bg-[#ebebeb] gap-10 pt-[10px] text-[18px] text-[#3a3838] ">
                                    <div className="work-space-creator flex items-center gap-10">
                                    <p>Work Space</p>
                                    <span><IoAdd size={20}/></span>
                                   </div>
                             </div>
                        </div>

                        <div className="work-space-container flex items-center justify-center mt-[20px] gap-[5]">
                              <Selection/>
                        </div>
                        <div className="button-component text-[18px] mt-[40px]">
                              <div className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><MdSpaceDashboard/>Dashboard</div>
                              <div className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><GoTasklist/>My Task</div>
                              <div className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><MdFormatListBulletedAdd/>Add Task</div>
                              <div className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><FaDiagramProject/>Projects</div>
                              <div className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><MdOutlinePlaylistAdd/>Add Project</div>
                              <div className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><IoSettings />Setting</div>
                              <div className="logout-button mt-[100px]  cursor-pointer">
                                    <div className="logout-hover w-[100%] pl-[10px] h-[50px] bg-red-400 text-white flex items-center gap-5"><RiLogoutCircleLine/>Logout</div>
                              </div>
                  </div>

                  </div>
            </div>
            <div className="user-profile-letter right-20 w-[40px] h-[40px] flex bg-violet-500 font-bold text-white rounded-[50%] cursor-pointer justify-center items-center fixed z-40 mt-[30px]">
                        A
                  </div>
      </>)
}