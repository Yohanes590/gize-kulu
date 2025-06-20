import jwt ,{JwtPayload} from "jsonwebtoken"
import prisma from "@/lib/prisma"
import nodemailer from 'nodemailer'
export async function POST(userRequest: Request) {
      const userRequestBody = await userRequest.json()
      if (userRequestBody.length > 1) {
            return Response.json({message:"invalid Key" ,status:400})
      } else {
            const UserToken = userRequestBody.user_token
            const verifyKey=process.env.ACCESS_TOKEN
            if (!verifyKey) {
                  return Response.json({message:"invalid secret key" ,status:500})
            }
            try {
                  const verify = jwt.verify(UserToken, verifyKey) as JwtPayload
                  const FetchEmail = verify.user_info.user_email

                  let OTP;
                  const transport = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                              user: process.env.EMAIL_PASS,
                              pass:process.env.GOOGE_SECRET
                        }
                  })
                   OTP = Math.floor(100000 + Math.random() * 900000)
                  const mailOption = {
                        from: process.env.EMAIL_PASS,
                        to: FetchEmail,
                        subject: "Your Verification Key From GIZE KULU APP",
                        html: `
                        <h1>Verification Key From Gize Kulu Team. Don't share for any body ! </h1>
                        <p>${OTP}</p>
                        `
                  }
                  setTimeout(() => {
                        OTP = null;
                  }, 500000);
                  try {
                        await transport.sendMail(mailOption)
                        const GettingUser = await prisma.user.update({
                              where: { user_email: FetchEmail },
                              data: {
                                    user_verify:true
                              }
                        })
                        if (!GettingUser) {
                              return Response.json({message:"invalid secrete key",status:400})   
                        }
                        return Response.json(verify)
                  } catch (error) {
                        return Response.json({message:"something wen't error"})
                  }

   
            } catch (error:any) {
                  return Response.json({message: error.message})   
            }
  
      }
}