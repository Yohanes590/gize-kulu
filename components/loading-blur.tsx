import { HashLoader } from "react-spinners"
export default function LoadingBlur() {
      return <>
            <div className="loading_blur w-[100%] fixed flex justify-center items-center z-50 h-full backdrop-blur-2xl bg-[#010f24bd]">
                <HashLoader color="white"/>  
      </div>
      </>
}