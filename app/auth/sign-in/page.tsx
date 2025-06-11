import Link from "next/link";

export default function SignIN() {
      return (<>
            <div className="input-box-container w-full h-screen relative flex  justify-center items-center">
                  <div className="some-input-section w-[600px] h-[370px] rounded-[10px] shadow-[0_0_5px_#cfcfcf] bg-[white]">

                        <div className="box-header-section pt-[30px] pl-[20px]">
                              <h1 className="font-bold text-[25px]">Sign In </h1>
                              <p className="text-[#a0a0a0]">sign in into your existed account</p>
                        </div>

                        <div className="input-section-user pl-[20px] mt-[20px]">
                             <input type="email" placeholder="*Email" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px]" />
                              <input type="password" placeholder="*Password" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px] mt-[10px]" />
                              <button className="mt-[10px] w-[95%] h-[45px] cursor-pointer bg-blue-500 text-white rounded-[10px]">Sign In</button>
                              <div className="small-message mt-[30px]">
                                    <p className="text-[#6e6e6e]">I don't have account <Link className="text-blue-500" href="/auth/sign-up">Sign Up</Link></p>
                              </div>
                              </div>

                        </div>
            </div>
      </>)
}