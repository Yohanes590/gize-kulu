import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"
export async function POST(userEachRequest: Request) {
      const userRequest = await userEachRequest.json()
      const DecoderKey = process.env.ACCESS_TOKEN
      if (!DecoderKey) {
      return Response.json({message:"internal server error" , status:500})
      }
            try {
                  const verifyUser = jwt.verify(userRequest.user_token, DecoderKey) as JwtPayload
                const deleted= await prisma.user.delete({
                        where: {
                              user_email:verifyUser.userInfo.user_email
                        }
                  })
              return Response.json({message:deleted,status:200})
            } catch (error) {
                  return Response.json({ message: "token error", status:400})
            }
}