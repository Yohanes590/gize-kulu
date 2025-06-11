"use client"
import Link from "next/link";
import SignInOTP from "@/components/otp-component/sign-in-otp";
export default function SignIN() {
      const signFunction = () => {
            const OtpElement = document.querySelector(".sign-in-otp-container") as HTMLElement;
            OtpElement.classList.remove("hidden")
            OtpElement.classList.add("flex")
      }
      return (<>
            <div className="sign-in-otp-container bg-[#000000a2] w-full h-screen hidden fixed justify-center items-center z-40 backdrop-blur-2xl">

                  <div className="center-element bg-[white] rounded-[10px] flex justify-center items-center  h-[200px] w-[400px]">
                        <div className="otp-compo">
                              <h1>Check your email inbox <br/>
                                    we've sent you an OTP.</h1>
                              <div className="otp mt-[5px]">
                        <SignInOTP/>
                              </div>
                              <button className="mt-[5px] h-[35px] w-[220px] bg-green-500 text-[white] cursor-pointer rounded-[10px]">Verify</button>
                        </div>
                  </div>
            </div>

            

            <div className="input-box-container w-full h-screen relative flex  justify-center items-center">
                  <div className="some-input-section w-[600px] h-[370px] rounded-[10px] shadow-[0_0_5px_#cfcfcf] bg-[white]">

                        <div className="box-header-section pt-[30px] pl-[20px]">
                              <h1 className="font-bold text-[25px]">Sign In </h1>
                              <p className="text-[#a0a0a0]">sign in into your existed account</p>
                        </div>

                        <div className="input-section-user pl-[20px] mt-[20px]">
                             <input type="email" placeholder="*Email" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px]" />
                              <input type="password" placeholder="*Password" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px] mt-[10px]" />
                              <button className="mt-[10px] w-[95%] h-[45px] cursor-pointer bg-blue-500 text-white rounded-[10px]" onClick={signFunction}>Sign In</button>
                              <div className="small-message mt-[30px]">
                                    <p className="text-[#6e6e6e]">I don't have account <Link className="text-blue-500" href="/auth/sign-up">Sign Up</Link></p>
                              </div>
                              </div>

                        </div>
            </div>
      </>)
}