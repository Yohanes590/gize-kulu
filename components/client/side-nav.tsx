import { IoAdd } from "react-icons/io5";
export default function SideNavBar() {
      return (<>
            <div className="side-nav-container w-[350px] h-[100%] fixed cursor-default z-40 shadow-[0_0_5px_#bfbfbf]">
                  <div className="sub-container pt-[50px] ">
                        
                        <div className="logo-space">
                              <h1 className="font-bold text-[25px]">GIZE <span className="text-red-500">KULU</span></h1>
                              <div className="sub-title-section flex cursor-pointer pl-[10px] duration-100 transition h-[50px] w-[100%] hover:bg-[#d4d4d4] gap-10 pt-[10px] text-[18px] text-[#3a3838] items-center ">
                                    <p>Work Space</p>
                                    <span><IoAdd size={20}/></span>
                             </div>
                        </div>

                        <div className="work-space-container flex items-center mt-[20px] gap-[5]">
                              
                        </div>
                  </div>
           </div>
      </>)
}