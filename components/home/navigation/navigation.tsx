import './navigation.css'
export default function Navigation() {
      return <>
            <div className="navigation-bar w-full flex items-center justify-around h-[80px] border-b-2 border-[#f0f0f0]">
                  <div className="logo font-bold text-[25px] cursor-pointer">
                        <h1>GIZE <span className="text-[#003cff]">KULU</span></h1>
                  </div>
                  <div className="links text-[#535353] flex gap-7">
                        <a href="#">Home</a>
                        <a href="#features">Features</a>
                        <a href="mailto:jplussince34@gmail.com">Contact</a>
                  </div>
                  <div className="buttons flex gap-5">
                        <button onClick={()=>{window.location.href="/auth/sign-up"}} className="bg-[#242424] cursor-pointer w-[100px] h-[40px] text-white hover:bg-[#383838] transition-all duration-500 rounded-[8px]">Sign Up</button>
                        <button onClick={()=>{window.location.href="/auth/sign-in"}} className="bg-[#faf8f8] cursor-pointer w-[100px] h-[40px] text-black rounded-[8px]">Sign In</button>
                  </div>
            </div>
      </>
}