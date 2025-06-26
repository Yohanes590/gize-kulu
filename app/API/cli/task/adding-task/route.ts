import prisma from "@/lib/prisma"
import jwt , { JwtPayload } from 'jsonwebtoken'
export async function POST(ClientRequest: Request) {
      const UserRequest = await ClientRequest.json()
      const DecodeAccessKey = process.env.ACCESS_TOKEN;
      if (!DecodeAccessKey) {
            return Response.json({message:"internal server error" , status:500})
      } else {
            const decodeToken = jwt.verify(UserRequest.user_Token, DecodeAccessKey) as JwtPayload
            const userInfoDB = await prisma.$runCommandRaw({
                  update: "User",
                  updates: [{
                        q: { user_email: decodeToken.userInfo.user_email },
                        u: {
                              $push:{
                                    user_projects:{
                                          project_name: UserRequest.project_name,
                                          project_task: [UserRequest]
                                    }
                              }
                        }
                  }]
            })
      return Response.json(userInfoDB)
      }
}