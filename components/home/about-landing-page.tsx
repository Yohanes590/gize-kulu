import Image from "next/image"
export default function PicAbout() {
      return <>
            <div className="h-screen flex justify-center items-center ">
                  
                  <Image src="/about-pic-cover.png" width={1000} height={100} alt="about picture dashboard" className="w-[80%]
                  shadow-[0_0_5px_#e7e7e7] rounded-[10px]
                  "/>

           </div>
      </>
}