import jwt ,{JwtPayload} from "jsonwebtoken"
import nodemailer from 'nodemailer'
import bcrypt from "bcryptjs"
export async function POST(userRequest: Request) {
      const userRequestBody = await userRequest.json()
      if (userRequestBody.length > 2) {
            return Response.json({message:"invalid Key" ,status:400})
      } else {
            const UserToken = userRequestBody.user_token
            const verifyKey=process.env.ACCESS_TOKEN
            if (!verifyKey) {
                  return Response.json({message:"invalid secret key" ,status:500})
            }
            try {
                  const verify = jwt.verify(UserToken, verifyKey) as JwtPayload
                  const FetchEmail = verify.userInfo.user_email
                  const FetchUserName = verify.userInfo.user_name
                  let OTP;
                  OTP = Math.floor(100000 + Math.random() * 900000)
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
                              <h2>Hi ${FetchUserName} 👋 </h2>
                              <h3>Verification key from the Gize Kulu team. Do not share it with anyone!  </h3>
                              <h4>This OTP Expires After 5 MIN</h4>
                              <p>${OTP}</p>
                              `
                        }
                        const sendOTP = await bcrypt.genSalt(10)
                        const hashedOTP = await bcrypt.hash(`${OTP}`, sendOTP)
                        const ENV_KEY = process.env.ACCESS_TOKEN
                        if (!ENV_KEY) {
                              return Response.json({message:"internal server error" , status:500})
                        }
                        const OTP_TOKEN = jwt.sign({otpToken:hashedOTP},ENV_KEY,{expiresIn:"5m"})
                        try {
                              await transport.sendMail(mailOption)
                              return Response.json({message:"send success fully",status:200,otpToken:OTP_TOKEN})
                        } catch (_error:unknown) {
                              return Response.json({message:"something wen't error",status:500})
                        }
      
   
            } catch (_error:unknown) {
                  return Response.json({message: "internal server error" , status:500})   
            }
  
      }
}