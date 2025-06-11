import SideNavBar from "./client/side-nav"
import { SiSpringsecurity } from "react-icons/si";
import { MdDangerous } from "react-icons/md";
export default function SettingFunction() {
      return (<>
            <SideNavBar />
            <div className="setting-container ml-[400px] pt-[80px]">
            <div className="setting-header">
                  <h1 className="text-[25px] font-bold">Setting</h1>
                  <h1 className="text-[16px] text-[#807d7d]">Edit and update your profile information</h1>
                  </div>

                  <div className="profile-editor-input-section mt-[40px]">
                        <div className="input-card-section shadow-[0_0_5px_#cccccc] w-[550px] h-[450px] pl-[30px] pt-[20px] rounded-[10px]">
                              <div className="header-section">
                              <h1 className="text-[20px] font-bold flex items-center text-blue-500 gap-5">Security Editor <SiSpringsecurity/></h1>
                              <h1 className="text-[16px] text-[#807d7d]">Edit sensitive information</h1>
                              </div>
                        <input type="text" placeholder="full name" className="w-[400px] mt-[10px] h-[50px] rounded-[10px] pl-[20px] bg-[#f0f0f0]"/><br/>
                        <input type="text" placeholder="email" className="w-[400px] mt-[10px] h-[50px] rounded-[10px] pl-[20px] bg-[#f0f0f0]"/><br/>
                        <input type="password" placeholder="old password" className="w-[400px] mt-[10px] h-[50px] rounded-[10px] pl-[20px] bg-[#f0f0f0]"/><br/>
                        <input type="password" placeholder="new password" className="w-[400px] mt-[10px] h-[50px] rounded-[10px] pl-[20px] bg-[#f0f0f0]"/><br/>
                              <input type="password" placeholder="confirm password" className="w-[400px] mt-[10px] h-[50px] rounded-[10px] pl-[20px] bg-[#f0f0f0]" /><br />
                              <button className="mt-[20px] w-[150px] h-[40px] cursor-pointer bg-blue-500 rounded-[10px] text-white ">Save changes</button>
                        </div>
                        
                        <div className="danger-zone-information shadow-[0_0_5px_#cccccc] w-[550px] h-[150px] rounded-[10px] mt-[20px]">
                        <div className="header-section pt-[20px] pl-[20px]">
                              <h1 className="text-[20px] font-bold text-red-500 flex items-center gap-5">Danger Zone <MdDangerous/></h1>
                              <h1 className="text-[16px] text-[#807d7d]">Delete your information and your account</h1>
                              </div>
                              <button className="ml-[20px] h-[40px] mt-[10px] w-[300px] bg-red-400 text-[white] rounded-[10px] cursor-pointer ">Delete Account</button>
 
                  </div>

                  </div>

            </div>
      </>)
}