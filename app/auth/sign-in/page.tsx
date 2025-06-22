"use client"
import Link from "next/link";
import { PuffLoader   } from "react-spinners";
import SignInOTP from "@/components/otp-component/sign-in-otp";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Cookie from "js-cookie"
export default function SignIN() {
      const  [ DisableButton , setBoolean ] = useState<boolean>(false)
      const [ otp ,setOTP ] = useState<string>("")
      const signFunction = async () => {
            const display = document.querySelector(".display-value") as HTMLElement
            const email = document.getElementById("email") as HTMLInputElement;
            const password = document.getElementById("password") as HTMLInputElement;
            const SubmitButton = document.getElementById("submit-button") as HTMLElement;
            const buttonLoading = document.querySelector(".loading") as HTMLElement
            if (email.value == "") {
                  display.innerText="please insert Email"
            } else if (!email.value.includes("@")) {
                  display.innerText="invalid Email"
            } else if (password.value == "") {
                  display.innerText="empty password"
            } else if (password.value.length < 8) {
                  display.innerText="invalid password"
            } else {
                  display.innerText = ""
                  setBoolean(true)
                  SubmitButton.style.background = "#1a4c99"
                  buttonLoading.classList.add("flex")
                  buttonLoading.classList.remove("hidden")
                  SubmitButton.style.cursor="progress"
                  const loginLoading = toast.loading("authenticating...")
            const SendToServer=  await fetch("/API/Authentication/sign-in", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                              user_email: email.value,
                              user_password:password.value,
                        })
                  })
                  const serverResponse = await SendToServer.json()
                  toast.dismiss(loginLoading)
                  setBoolean(false)
                  SubmitButton.style.background = "#2B7FFF"
                  buttonLoading.classList.add("hidden")
                  buttonLoading.classList.remove("flex")
                  SubmitButton.style.cursor="pointer"
                  if (serverResponse.status == 200) {
                        toast.success(serverResponse.message)
                        Cookie.remove("OTP-TOKEN")
                        Cookie.set("access-token", serverResponse.accessToken,{sameSite:"strict" ,secure:true})
                        window.location.href="/dashboard"
                  } else if (serverResponse.status == 404) {
                        toast.error(serverResponse.message)
                  } else if (serverResponse.status == 401) {
                        Cookie.set("access-token", serverResponse.accessToken,{sameSite:"strict" ,secure:true})
                        const OtpElement = document.querySelector(".sign-in-otp-container") as HTMLElement;
                        OtpElement.classList.remove("hidden")
                        OtpElement.classList.add("flex") 
                        toast.error(serverResponse.message)
                  }else if(serverResponse.status == 500){
                        toast.error(serverResponse.message)
                  }else{
                        toast.error(serverResponse.message)
                  }
            }

      }

      const SendingOTP = async () => {
      const SendingAnime = toast.loading("sending otp...")
      const UserTOken = Cookie.get("access-token")
      const SendOTP = await fetch("/API/Authentication/otp",{
            method: "post",
            headers: {
                  "Content-Type":"application/json"
            },
            body: JSON.stringify({
                  user_token:UserTOken
            })
      })
            toast.dismiss(SendingAnime)
            const serverResponse = await SendOTP.json()
            if (serverResponse.status == 200) {
                  toast.success("Check You Email Inbox!")
                  Cookie.set("OTP-TOKEN" ,serverResponse.otpToken,{sameSite:"strict" ,secure:true})
            } else {
                  toast.error("Client Error!")
            }
}

      const verifyOTP = async () => {
            const Au = toast.loading("authenticating....")
            const user_token = Cookie.get("access-token")
            const otp_token = Cookie.get("OTP-TOKEN")
            const SendForServer = await fetch("/API/Authentication/checkotp", {
                  method: "post",
                  headers: {
                        "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                        otp_token: otp_token,
                        user_otp: otp,
                        user_token:user_token
                  })
            })
            const serverResponding = await SendForServer.json()
            toast.dismiss(Au)
            if (serverResponding.status === 200) {
                  Cookie.remove("OTP-TOKEN")
                  toast.success(serverResponding.message)
                  window.location.href="/dashboard"
            } else {
                  toast.error(serverResponding.message)
            }
      }
      
      return (<>
            <Toaster/>
            <div className="sign-in-otp-container bg-[#000000a2] w-full h-screen hidden fixed justify-center items-center z-40 backdrop-blur-2xl">

                  <div className="center-element bg-[white] rounded-[10px] flex justify-center items-center  h-[250px] w-[400px]">
                        <div className="otp-compo">
                        <h1>Please verify your account.<br/>
                        Click "Send OTP" to receive your OTP.</h1>
                              <div className="otp mt-[5px]">
                        <SignInOTP value={otp} onChange={setOTP}/>
                              </div>
                              <button onClick={verifyOTP} className="mt-[5px] h-[35px] w-[220px] bg-green-500 text-[white] cursor-pointer rounded-[10px]">Verify</button>
                             <br/><br/> <button onClick={SendingOTP} className="cursor-pointer">Send Otp</button>
                        </div>
                  </div>
            </div>

            

            <div className="input-box-container w-full h-screen relative flex  justify-center items-center">
                  <div className="some-input-section w-[600px] h-[370px] rounded-[10px] shadow-[0_0_5px_#cfcfcf] bg-[white]">

                        <div className="box-header-section pt-[30px] pl-[20px]">
                              <h1 className="font-bold text-[25px]">Sign In </h1>
                              <p className="text-[#a0a0a0]">sign in into your existed account</p>
                              <p className="display-value mt-[5px] text-red-500"></p>
                        </div>

                        <div className="input-section-user pl-[20px] mt-[20px]">
                             <input id="email" type="email" placeholder="*Email" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px]" />
                              <input id="password"type="password" placeholder="*Password" className="w-[95%] outline-1 outline-blue-400 h-[45px] pl-[20px] bg-[#f0f5ff] rounded-[10px] mt-[10px]" />
      <button disabled={DisableButton} id="submit-button" className="mt-[10px] w-[95%] flex gap-2 items-center justify-center h-[45px] cursor-pointer bg-blue-500 text-white rounded-[10px]" onClick={signFunction}>
                                          Sign Up
                                        <div className="loading hidden"> <PuffLoader size={20} color="#ffffff" /></div> 
                                    </button>
                              <div className="small-message mt-[30px]">
                                    <p className="text-[#6e6e6e]">I don't have account <Link className="text-blue-500" href="/auth/sign-up">Sign Up</Link></p>
                              </div>
                              </div>

                        </div>
            </div>
      </>)
}