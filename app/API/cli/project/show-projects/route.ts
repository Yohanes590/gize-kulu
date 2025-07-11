import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"
export async function POST(request: Request) {
      const clientSideRequest = await request.json()
      const VerificationKey = process.env.ACCESS_TOKEN
      if (!VerificationKey) {
            return Response.json({message:"internal server error" , status:500})
      }
      try {
            const verifyUser = jwt.verify(clientSideRequest.user_token, VerificationKey) as JwtPayload
            const UserEmail = verifyUser.userInfo.user_email
            const userInfo = await prisma.user.findUnique({
                  where: {
                        user_email:UserEmail
                  }
            }) 
      return Response.json(userInfo?.user_projects) 
      } catch (_error:unknown) {
            return Response.json({message:"please login again!" , status:400})
      }

}