"use client"
import { IoAdd, IoSettings } from "react-icons/io5";
import Selection from "./selection";
import { MdSpaceDashboard  ,MdFormatListBulletedAdd ,MdOutlinePlaylistAdd} from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { FaDiagramProject } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import Link from "next/link";
import { CgMenuRightAlt } from "react-icons/cg";
import { useState , useEffect } from "react";
export default function SideNavBar() {

      useEffect(() => {
         function CheckRouterPath() {
            const PathName = window.location.pathname;
               const dashboardElement = document.getElementById("dashboard") as HTMLElement
               const MytaskElement = document.getElementById("my-task") as HTMLElement
               const AddTaskElement = document.getElementById("add-task") as HTMLElement
               const Projects = document.getElementById("projects") as HTMLElement
               const AddProject = document.getElementById("add-project") as HTMLElement
               const setting = document.getElementById("setting") as HTMLElement
            if (PathName === "/dashboard") {
                  dashboardElement.classList.add("active-class")
            } else if (PathName === "/my-task") {
                  MytaskElement.classList.add("active-class")
            } else if (PathName === "/add-task") {
                  AddTaskElement.classList.add("active-class")
            } else if (PathName === "/projects") {
                  Projects.classList.add("active-class")
            } else if (PathName === "/add-project") {
                  AddProject.classList.add("active-class")
            } else if (PathName === "/setting") {
                  setting.classList.add("active-class")
            }
            }  
      CheckRouterPath()      
      },[])
     

      const [openSlider, setSlider] = useState<boolean>(true)
      const [ mainBar ,setMainBar ] = useState<boolean>(true)
      const OpenSliderFunction = () => {
            const SliderComponent = document.querySelector(".user-profile-show") as HTMLElement
            if (openSlider === true) {
                  setSlider(false)
                  SliderComponent.style.height = "100px"
                  SliderComponent.style.paddingTop = "15px"
            } else if(openSlider === false){
                  setSlider(true)
                  SliderComponent.style.height = "0px"
                  SliderComponent.style.paddingTop = "0px"  
            }
      }
      const OpenMainBar = () => {
            const MainBarElement = document.querySelector(".side-nav-container") as HTMLElement;
            if (mainBar === true) {
                  setMainBar(false)
                  MainBarElement.style.width="350px"
            } else {
                  setMainBar(true)
                  MainBarElement.style.width="0px" 
            }
      }
      return (<>
            <div className="side-nav-container transition-all duration-700 bg-white w-[350px] h-[100%] fixed cursor-default z-40 shadow-[0_0_5px_#bfbfbf]">
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
                              <Link href="/dashboard"><div id="dashboard" className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><MdSpaceDashboard/>Dashboard</div></Link>
                              <Link href="/my-task"><div id="my-task" className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><GoTasklist/>My Task</div></Link>
                              <Link href="/add-task"><div id="add-task" className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><MdFormatListBulletedAdd/>Add Task</div></Link>
                              <Link href="/projects"><div id="projects" className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><FaDiagramProject/>Projects</div></Link>
                              <Link href="/add-project"><div id="add-project" className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><MdOutlinePlaylistAdd/>Add Project</div></Link>
                              <Link href="/setting"><div id="setting" className="hover-buttons w-[100%] h-[50px] flex items-center gap-3 pl-[10px] cursor-pointer"><IoSettings />Setting</div></Link>
                              <Link href=""><div className="logout-button mt-[100px]  cursor-pointer">
                                    <div className="logout-hover w-[100%] pl-[10px] h-[50px] text-red-500 transition duration-500 hover:bg-red-400 hover:text-white flex items-center gap-5"><RiLogoutCircleLine/>Logout</div>
                              </div></Link>
                  </div>

                  </div>
            </div>
            <div onClick={OpenSliderFunction} className="user-profile-letter right-20 w-[40px] h-[40px] flex bg-violet-500 font-bold text-white rounded-[50%] cursor-pointer justify-center items-center fixed z-40 mt-[30px]">
                        Y
            </div>
            <div className="user-profile-show transition-all duration-600 cursor-default fixed shadow-[0_0_5px_#cacaca] right-3 rounded-[10px] mt-[80px] bg-[white] w-[auto] pl-[20px] pr-[20px] h-[0px] overflow-hidden">
                  <div className="h-[40px] text-[var(--blue-color)]">Yohanes Mulugeta</div>
                  <div className="h-[40px] text-[var(--blue-color)]">jplussince34@gmail.com</div>
            </div>
            <div onClick={OpenMainBar} className="hidden-menu-icon hidden fixed rounded-[50%] right-[20px] z-40 mt-[20px] h-[50px] w-[50px]  justify-center items-center bg-violet-500 text-white">
                  <CgMenuRightAlt size={30}/>
            </div>
      </>)
}