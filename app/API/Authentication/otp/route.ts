import jwt ,{JwtPayload} from "jsonwebtoken"
import prisma from "@/lib/prisma"
import nodemailer from 'nodemailer'
export async function POST(userRequest: Request) {
      const userRequestBody = await userRequest.json()
      if (userRequestBody.length > 2) {
            return Response.json({message:"invalid Key" ,status:400})
      } else {
            const UserToken = userRequestBody.user_token
            const userOtp = userRequestBody.user_otp
            const verifyKey=process.env.ACCESS_TOKEN
            if (!verifyKey) {
                  return Response.json({message:"invalid secret key" ,status:500})
            }
            try {
                  const verify = jwt.verify(UserToken, verifyKey) as JwtPayload
                  const FetchEmail = verify.userInfo.user_email
                  let OTP;
                  OTP = Math.floor(100000 + Math.random() * 900000)
                  setTimeout(() => {
                        OTP = null;
                  }, 500000);
                  if (userOtp == 0) {
                        const transport = nodemailer.createTransport({
                              service: "Gmail",
                              auth: {
                                    user: process.env.EMAIL_PASS,
                                    pass:process.env.GOOGE_SECRET
                              }
                        })
                        const mailOption = {
                              from: process.env.EMAIL_PASS,
                              to: FetchEmail,
                              subject: "Your Verification Key From GIZE KULU APP",
                              html: `
                              <h1>Verification Key From Gize Kulu Team. Don't share for any body ! </h1>
                              <p>${OTP}</p>
                              `
                        }
                  
                        try {
                              await transport.sendMail(mailOption)
                              return Response.json({message:"send success fully",status:200})
                        } catch (error) {
                              return Response.json({message:"something wen't error",status:500})
                        }
      
                  } else {
                        if (OTP != userOtp) {
                              return Response.json({message:OTP})
                        } else {
                              const GettingUser = await prisma.user.update({
                                    where: { user_email: FetchEmail },
                                    data: {
                                          user_verify:true
                                    }
                              })
                              if (!GettingUser) {
                                    return Response.json({message:"invalid secrete key",status:400})   
                              }
                              return Response.json({message:"verified success fully",status:200})
                        }
                  }
   
            } catch (error:any) {
                  return Response.json({message: error.message})   
            }
  
      }
}