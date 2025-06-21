import jwt, { JwtPayload} from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
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
                  const checkOTP =await bcrypt.compare(hashedPasskey, user_otp)
                  if (!checkOTP) {
                      return  Response.json({message:"inCorrect otp" , status:400})
                  }
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
                  return Response.json({ message: "account verified", status: 200 })
                  
                  } catch (error) {
                  return Response.json({message:"otp expires" , status:400})
            }
      }
      return Response.json(user_input)
}

            // if (OTP != userOtp) {
            //       return Response.json({message:OTP})
            // } else {
            //       const GettingUser = await prisma.user.update({
            //             where: { user_email: FetchEmail },
            //             data: {
            //                   user_verify:true
            //             }
            //       })
            //       if (!GettingUser) {
            //             return Response.json({message:"invalid secrete key",status:400})   
            //       }
            //       return Response.json({message:"verified success fully",status:200})
            // }