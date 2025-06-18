"use client"
import Link from "next/link";
import SignInOTP from "@/components/otp-component/sign-in-otp";
import { PuffLoader   } from "react-spinners";
import { useState } from "react";
export default function SignUp() {
                  const  [ DisableButton , setBoolean ] = useState<boolean>(false)
                  const signUpFunction = async():Promise<void> => {

            const fullName = document.getElementById("full-name") as HTMLInputElement;
            const email = document.getElementById("email") as HTMLInputElement;
            const password = document.getElementById("password") as HTMLInputElement;
            const confirm_password = document.getElementById("confirm-password") as HTMLInputElement;
            const Error_display = document.getElementById("error-display") as HTMLElement;
                        const SubmitButton = document.getElementById("submit-button") as HTMLElement;
                        const buttonLoading = document.querySelector(".loading") as HTMLElement
                         const Empty = ""
                        const userInformation = {
                              user_name: fullName.value,
                              user_email: email.value,
                              user_password: password.value
                         }
            if (fullName.value === Empty) {
                  Error_display.innerText=`Full name required!`
            } else if (email.value === Empty) {
                  Error_display.innerText=`Email required!`
            }  else if (!email.value.includes('@')) {
                  Error_display.innerText=`Invalid Email!`
            }else if (password.value === Empty) {
                  Error_display.innerText=`Password required!`
            }else if (password.value.length < 8) {
                  Error_display.innerText=`Min 8 character allowed`
            }  else if (confirm_password.value === Empty) {
                  Error_display.innerText=`Confirm password required!`
            }  else if (confirm_password.value != password.value) {
                  Error_display.innerText=`Password Not mach`
            } else {
                  setBoolean(true)
                  Error_display.innerText = ``
                  SubmitButton.style.background = "#1a4c99"
                  buttonLoading.classList.add("flex")
                  buttonLoading.classList.remove("hidden")
                  SubmitButton.style.cursor="progress"
                  const SendData = await fetch("/API/Authentication/sign-up", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                        body:JSON.stringify(userInformation)
                  })
                  setBoolean(false)
                  SubmitButton.style.background = "#2B7FFF"
                  buttonLoading.classList.add("hidden")
                  buttonLoading.classList.remove("flex")
                  SubmitButton.style.cursor="pointer"
                  const ServerRespond = await SendData.json()
                  console.log(ServerRespond)
            }

           

            // const OtpElement = document.querySelector(".sign-in-otp-container") as HTMLElement;
            // OtpElement.classList.remove("hidden")
            // OtpElement.classList.add("flex")
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
                  <div className="some-input-section w-[600px] h-[470px] rounded-[10px] shadow-[0_0_5px_#cfcfcf] bg-[white]">

                        <div className="box-header-section pt-[30px] pl-[20px]">
                              <h1 className="font-bold text-[25px]">Sign Up </h1>
                              <p className="text-[#a0a0a0]">register new account and manage your time!</p>
                              <p id="error-display" className="text-red-400 mt-[10px]"></p>
                        </div>

                        <div className="input-section-user pl-[20px] mt-[20px]">
                              <input id="full-name" type="text" placeholder="*Full Name" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px]" />
                              <input id="email" type="email" placeholder="*Email" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px] mt-[10px]" />
                              <input id="password" type="password" placeholder="*Password" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px] mt-[10px]" />
                              <input id="confirm-password" type="password" placeholder="*Confirm" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px] mt-[10px]" />
                              <button disabled={DisableButton} id="submit-button" className="mt-[10px] w-[95%] flex gap-2 items-center justify-center h-[45px] cursor-pointer bg-blue-500 text-white rounded-[10px]" onClick={signUpFunction}>
                                    Sign Up
                                  <div className="loading hidden"> <PuffLoader size={20} color="#ffffff" /></div> 
                              </button>
                              <div className="small-message mt-[20px]">
                                    <p className="text-[#6e6e6e]">Already I have account <Link className="text-blue-500" href="/auth/sign-in">Sign In</Link></p>
                              </div>
                              </div>

                        </div>
            </div>
      </>)
}