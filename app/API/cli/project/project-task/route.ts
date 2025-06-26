import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"
export async function POST(userRequest: Request) {
      const userInformation = await userRequest.json()
      try {
            const decodedKey = process.env.ACCESS_TOKEN 
            if (!decodedKey) {
                  return Response.json({message:"internal server error" , status:500})
            }
            const verifiedJwt = jwt.verify(userInformation.user_token, decodedKey) as JwtPayload
           const project_task= await prisma.user.findUnique({
                  where: {
                        user_email:verifiedJwt.userInfo.user_email
         },
           })
            const filterProject = await project_task?.user_projects
            return Response.json(filterProject)
      } catch (error) {
            return Response.json({message:"expired token" , status:400})
      }
}