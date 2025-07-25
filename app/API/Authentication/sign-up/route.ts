import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
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
                  const userToken = jwt.sign(TokenInfo,access_key,{expiresIn:"7d"})
                  await prisma.user.create({
                  data: {
                        user_name: ClientData.user_name,
                        user_email: ClientData.user_email,
                        user_password: HashedPassword,
                        user_projects: [],
                        user_verify:false,
                  }
                  }) 
                  return Response.json({message:"created success fully",accessToken:userToken ,status:200})
           } catch (error:any) {
            return Response.json({message:error.message , status:500})
           }
}
}