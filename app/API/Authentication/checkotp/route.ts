import jwt, { JwtPayload} from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import nodemailer  from 'nodemailer'
export async function POST(userRequest: Request) {
      const user_input = await userRequest.json()
      const otp_token = user_input.otp_token
      const user_otp = user_input.user_otp
      const user_token = user_input.user_token
      if (!otp_token) {
      return Response.json({message:"otp token valid!", status:400})
      } else {
            const JWT_KEY = process.env.ACCESS_TOKEN
            if (!JWT_KEY) {
            return Response.json({message:"internal server error", status:500})
            }

            try {
            const verifiedOTP = jwt.verify(otp_token, JWT_KEY) as JwtPayload
                  const hashedPasskey = verifiedOTP.otpToken
                  const checkOTP =await bcrypt.compare(user_otp,hashedPasskey )
                  if (!checkOTP) {
                      return  Response.json({message:"inCorrect otp" , status:400})
                  }
                  const transport = nodemailer.createTransport({
                              service: "Gmail",
                              auth: {
                                    user: process.env.EMAIL_PASS,
                                    pass:process.env.GOOGE_SECRET
                              }
                        })
                  const decodeUserToken = jwt.verify(user_token, JWT_KEY) as JwtPayload
                  const fetchEmail = decodeUserToken.userInfo.user_email
                  await prisma.user.update({
                        where: {
                              user_email:fetchEmail
                        },
                        data: {
                              user_verify:true
                        }
                  })
                  const now = new Date(Date.now());
                  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                  const mailOption = {
                        from: process.env.EMAIL_PASS,
                        to: fetchEmail,
                        subject: `You are now logged in at ${time} on the Gezi Kulu App.`,
                        html: `
                        Hi ${decodeUserToken.userInfo.user_name},
                        Thank you for logging in to Gezi Kulu. We're excited to have you back!
                        If you have any questions or need help, feel free to reach out to us anytime.
                        Happy exploring!
                        Gezi Kulu App
                        `
                  }
                  
                  try {
                        await transport.sendMail(mailOption)
                        return Response.json({ message: "login success", status: 200 })
                   } catch (error) {
                  return Response.json({ message: "cant send mail", status: 400 })
                  }
                  
                  } catch (error) {
                  return Response.json({message:"otp expires" , status:400})
            }
      }
      return Response.json(user_input)
}
