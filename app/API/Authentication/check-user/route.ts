import jwt ,{JwtPayload} from "jsonwebtoken"
import prisma from "@/lib/prisma"
export async function POST(clientINFO: Request) {
      const userInput = await clientINFO.json()
      try {
            const access_key = process.env.ACCESS_TOKEN
            if (!access_key) {
             return Response.json({message:"internal server error", status:500})
            }
            const digOutEmail = jwt.verify(userInput.user_token, access_key)as JwtPayload
          const userData= await prisma.user.findUnique({
                  where: {
                      user_email:digOutEmail.userInfo.user_email
                }
          })
            if (!userData) {
            return Response.json({message:'user not found!',status:400})
            } else {
                  if (userData.user_verify === false) {
            return Response.json({message:'please verify your account!',status:400})
                  } else {
                        const basicInfo = [{
                              user_name: userData.user_name,
                              user_email:userData.user_email
                        }]
                        return Response.json({basicInfo,status:200})
                  }
            }
      } catch (error) {
            
      }
      return Response.json(userInput)
}