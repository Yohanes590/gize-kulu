import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import nodemailer from 'nodemailer'
export async function POST(userRequest: Request) {
      const userData = await userRequest.json()
      const checkVerification = await prisma.user.findUnique({
            where: {
                  user_email:userData.user_email
            }
      })
      if (checkVerification) {
            const TokenInfo = {
                  id: 1,
                  userInfo: {
                        user_name: checkVerification.user_name,
                        user_email: userData.user_email,
                  }
            }
            const transport = nodemailer.createTransport({
                  service: "Gmail",
                  auth: {
                        user: process.env.EMAIL_PASS,
                        pass:process.env.GOOGE_SECRET
                  }
            })
            const localKey = process.env.ACCESS_TOKEN
            const user_verify_key = checkVerification.user_verify
            if (!localKey) {
                  return Response.json({message:"internal server error" , status:500})
                }
             const LoginToken = jwt.sign(TokenInfo,localKey,{expiresIn:"7d"})
             if (user_verify_key === true) {
                  const checkPassword = await bcrypt.compare(userData.user_password, checkVerification.user_password)
                  if (!checkPassword) {
            return Response.json({message:"account not found" , status:404})
                   }
                   const now = new Date(Date.now());
                   const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                   const mailOption = {
                         from: process.env.EMAIL_PASS,
                         to: checkVerification.user_email,
                         subject: `You are login now in this ${time}`,
                         html: `
                         Hi ${checkVerification.user_name},
                         Thank you for logging in to Gezi Kulu. We're excited to have you back!
                         If you have any questions or need help, feel free to reach out to us anytime.
                         Happy exploring!
                         Gezi Kulu App
                         `
                   }
                   
                   try {
                         await transport.sendMail(mailOption)
             return Response.json({message:"login success" , status:200 , accessToken:LoginToken})
                    } catch (error) {
                   return Response.json({ message: "cant send mail", status: 400 })
                   }
            
            } else {

              
                  return Response.json({ message: "account need's verify", status: 401,accessToken:LoginToken})
            }

      } else {
      return Response.json({message:"account not found" , status:404})
      }
}