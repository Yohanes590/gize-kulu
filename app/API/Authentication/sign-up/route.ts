import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken"
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
                  const userToken = jwt.sign(TokenInfo,access_key)
                  const CreateUser = await prisma.user.create({
                  data: {
                        user_name: ClientData.user_name,
                        user_email: ClientData.user_email,
                        user_password: ClientData.user_password,
                        user_task: [],
                        user_token:userToken,
                  }
            }) 
            return Response.json(CreateUser)
           } catch (error:any) {
            return Response.json({message:error.message})
           }
}
}