import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import nodemailer from 'nodemailer'
export async function POST(UserInfo: Request) {
      const ClientData = await UserInfo.json()
      if (ClientData.length > 3) {
            return Response.json({message:"client error please input field properly"})
      } else {
            try {
                  const TokenInfo = {
                        id: 1, userInfo: {
                              user_name: ClientData.user_name,
                              user_email: ClientData.user_email,
                        }
                  } 
                  const access_key = process.env.ACCESS_TOKEN
                  if (!access_key) {
                        return Response.json({message:"Invalid Secrete Key"})
                  }
                  const genSalt =await bcrypt.genSalt(10)
                  const HashedPassword =await bcrypt.hash(ClientData.user_password,genSalt)
                  const userToken = jwt.sign(TokenInfo,access_key)
                  await prisma.user.create({
                  data: {
                        user_name: ClientData.user_name,
                        user_email: ClientData.user_email,
                        user_password: HashedPassword,
                        user_task: [],
                        user_verify:false,
                  }
                  }) 
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
                        to: ClientData.user_email,
                        subject: "Your Verification Key From GIZE KULU APP",
                        text: `
                        <h1>Verification Key From Gize Kulu Team. </h1>
                        <p>${OTP}</p>
                        `
                  }
                  setTimeout(() => {
                        OTP = null;
                  }, 500000);
                  try {
                        await transport.sendMail(mailOption)
                        return Response.json({message:"check your email inbox",accessToken:userToken ,status:200})
                  } catch (error) {
                        return Response.json({message:"something wen't error"})
                  }
           } catch (error:any) {
            return Response.json({message:error.message , status:500})
           }
}
}