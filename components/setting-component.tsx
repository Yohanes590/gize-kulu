"use client"
import SideNavBar from "./client/side-nav"
import { MdDangerous } from "react-icons/md";
import Cookie from 'js-cookie'
import { Toaster , toast } from "react-hot-toast";
export default function SettingFunction() {

      async function deletingRequest() {
            if (confirm("are you sure to delete account")) {
                  const gettingUserCookie = Cookie.get("access-token")
                  const loadingToast = toast.loading("Deleting Account")
                  const sendingCookie = await fetch('/API/Authentication/delete-user', {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                              user_token:gettingUserCookie
                        })
                  })
                  const serverResponse = await sendingCookie.json()
                  toast.dismiss(loadingToast)
                  if (serverResponse.status == 200) {
                        Cookie.remove("access-token")
                        toast("account deleted success")
                        window.location.reload()
                  } else {
                        toast.error("can't delete account")
                  }
            } else {
                  toast.success("process canceled success!")
            }
      }

      return (<>
            <Toaster/>
            <SideNavBar />
            <div className="setting-container ml-[400px] pt-[80px]">
            <div className="setting-header">
                  <h1 className="text-[25px] font-bold">Setting</h1>
                  <h1 className="text-[16px] text-[#807d7d]">If you want delete your account</h1>
                  </div>
                        
                        <div className="danger-zone-information shadow-[0_0_5px_#cccccc] w-[550px] h-[150px] rounded-[10px] mt-[20px]">
                        <div className="header-section pt-[20px] pl-[20px]">
                              <h1 className="text-[20px] font-bold text-red-500 flex items-center gap-5">Danger Zone <MdDangerous/></h1>
                              <h1 className="text-[16px] text-[#807d7d]">Delete your information and your account</h1>
                              </div>
                              <button onClick={deletingRequest} className="ml-[20px] h-[40px] mt-[10px] w-[300px] bg-red-400 text-[white] rounded-[10px] cursor-pointer ">Delete Account</button>
 

                  </div>
                  </div>
      </>)
}