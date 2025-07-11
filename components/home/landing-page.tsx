import Image from "next/image"
export default function LandingPage() {
      return <>
            <div className="home-page-container flex-wrap w-full flex justify-around items-center h-[800px]">

                  <div className="page-title w-[600px]">
                        <h1 className="text-[black] font-bold font-weight text-[45px]">Your Personal Time Assistance </h1>
                        <p className="text-[#858585] text-[18px]">Organize your projects, tasks, and goals in one place. 
                              Stay focused and achieve more with your personal command center.</p>
                        <div className="flex-button flex items-center gap-5">
                        <button onClick={()=>window.location.href="/auth/sign-up"} className="mt-[10px] text-[white] rounded-[5px] cursor-pointer bg-[#0382f8] hover:bg-[#416fac] transition-all duration-500 w-[150px] h-[45px]">Start to day</button>
                         <button onClick={()=>window.location.href="/dashboard"} className="mt-[10px] text-[white] rounded-[5px] cursor-pointer bg-[#040f1f] hover:bg-[#383838] transition-all duration-500 w-[250px] h-[45px]">View work space</button>
                        </div>
                  </div>

                  <div className="page-icon">
                        <Image src="/Time.svg" loading="lazy" width={500} height={100} alt="Image Icon" />
                  </div>   
            </div>
      </>
}