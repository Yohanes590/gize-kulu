"use client";
import Link from "next/link";
import SignInOTP from "@/components/otp-component/sign-in-otp";
import { PuffLoader } from "react-spinners";
import { useState } from "react";
import Cookie from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

// Function to strip HTML tags from any input
const stripHTMLTags = (input: string): string => {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function SignUp() {
  const [DisableButton, setBoolean] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [disabledButton, setButton] = useState<boolean>(false);
  const [otpButton, setOTPButton] = useState<boolean>(false);

  const signUpFunction = async (): Promise<void> => {
    const fullName = document.getElementById("full-name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const confirm_password = document.getElementById("confirm-password") as HTMLInputElement;
    const Error_display = document.getElementById("error-display") as HTMLElement;
    const SubmitButton = document.getElementById("submit-button") as HTMLElement;
    const buttonLoading = document.querySelector(".loading") as HTMLElement;

    // Sanitize input values
    const user_name = stripHTMLTags(fullName.value.trim());
    const user_email = stripHTMLTags(email.value.trim());
    const user_password = stripHTMLTags(password.value.trim());
    const confirm_pass = stripHTMLTags(confirm_password.value.trim());

    if (user_name === "") {
      Error_display.innerText = `Full name required!`;
    } else if (user_email === "") {
      Error_display.innerText = `Email required!`;
    } else if (!user_email.includes("@")) {
      Error_display.innerText = `Invalid Email!`;
    } else if (user_password === "") {
      Error_display.innerText = `Password required!`;
    } else if (user_password.length < 8) {
      Error_display.innerText = `Min 8 character allowed`;
    } else if (confirm_pass === "") {
      Error_display.innerText = `Confirm password required!`;
    } else if (confirm_pass !== user_password) {
      Error_display.innerText = `Password Not match`;
    } else {
      setBoolean(true);
      Error_display.innerText = ``;
      SubmitButton.style.background = "#1a4c99";
      buttonLoading.classList.add("flex");
      buttonLoading.classList.remove("hidden");
      SubmitButton.style.cursor = "progress";

      const SendData = await fetch("/API/Authentication/sign-up", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name,
          user_email,
          user_password,
        }),
      });

      setBoolean(false);
      SubmitButton.style.background = "#2B7FFF";
      buttonLoading.classList.add("hidden");
      buttonLoading.classList.remove("flex");
      SubmitButton.style.cursor = "pointer";

      const ServerRespond = await SendData.json();
      const OtpElement = document.querySelector(".sign-in-otp-container") as HTMLElement;

      if (ServerRespond.status == 200) {
        toast.success("Success Created Account");
        Cookie.remove("OTP-TOKEN");
        OtpElement.classList.remove("hidden");
        OtpElement.classList.add("flex");
        Cookie.set("access-token", ServerRespond.accessToken, {
          sameSite: "strict",
          secure: true,
          expires: 7,
        });
      } else {
        const serverSplit = ServerRespond.message.split(":");
        if (serverSplit[4] == " `User_user_email_key`") {
          toast.error("Email Already Taken");
        } else {
          toast.error("Invalid signup credentials");
        }
      }
    }
  };

  const sendOTP = async () => {
    setButton(true);
    const otpLOADING = toast.loading("sending OTP ...");
    const Token = Cookie.get("access-token");

    const sanitizedOtp = stripHTMLTags(otp.trim());

    const ServerRespond = await fetch("/API/Authentication/otp", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: Token,
        user_otp: sanitizedOtp,
      }),
    });

    const ChangeResponse = await ServerRespond.json();
    toast.dismiss(otpLOADING);
    setButton(false);

    if (ServerRespond.status == 400) {
      toast.error("Client Error!");
    } else {
      toast.success("Check Your Email Inbox!");
      Cookie.set("OTP-TOKEN", ChangeResponse.otpToken, {
        sameSite: "strict",
        secure: true,
      });
    }
  };

  const verifyOTP = async () => {
    const OTP_BUTTON = document.querySelector(".otp-button") as HTMLElement;
    setOTPButton(true);
    OTP_BUTTON.style.cursor = "no-drop";

    const verifiedLoading = toast.loading("authenticating....");
    const OTP_TOKEN = Cookie.get("OTP-TOKEN");
    const User_Token = Cookie.get("access-token");

    const sanitizedOtp = stripHTMLTags(otp.trim());

    const Send_OTP = await fetch("/API/Authentication/checkotp", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp_token: OTP_TOKEN,
        user_otp: sanitizedOtp,
        user_token: User_Token,
      }),
    });

    const serverResponse = await Send_OTP.json();
    setOTPButton(false);
    OTP_BUTTON.style.cursor = "pointer";
    toast.dismiss(verifiedLoading);

    if (serverResponse.status === 200) {
      Cookie.remove("OTP-TOKEN");
      toast.success(serverResponse.message);
      window.location.href = "/dashboard";
    } else if (serverResponse.status === 400) {
      toast.error(serverResponse.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="sign-in-otp-container bg-[#000000a2] w-full h-screen hidden fixed justify-center items-center z-40 backdrop-blur-2xl">
        <div className="center-element bg-[white] rounded-[10px] flex justify-center items-center  h-[250px] w-[400px]">
          <div className="otp-compo">
            <h1>
              Please verify your account.
              <br />
              Click "Send OTP" to receive your OTP.
            </h1>
            <div className="otp mt-[5px]">
              <SignInOTP value={otp} onChange={setOtp} />
            </div>
            <button disabled={otpButton} onClick={verifyOTP} className="otp-button mt-[5px] h-[35px] w-[220px] bg-green-500 text-[white] cursor-pointer rounded-[10px]">
              Verify
            </button>
            <br />
            <br />
            <button disabled={disabledButton} onClick={sendOTP} className="cursor-pointer text-center">
              Send OTP
            </button>
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

            <button
              disabled={DisableButton}
              id="submit-button"
              className="mt-[10px] w-[95%] flex gap-2 items-center justify-center h-[45px] cursor-pointer bg-blue-500 text-white rounded-[10px]"
              onClick={signUpFunction}
            >
              Sign Up
              <div className="loading hidden">
                <PuffLoader size={20} color="#ffffff" />
              </div>
            </button>

            <div className="small-message mt-[20px]">
              <p className="text-[#6e6e6e]">
                Already I have account <Link className="text-blue-500" href="/auth/sign-in">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
