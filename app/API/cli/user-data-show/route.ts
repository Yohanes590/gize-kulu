import jwt , {JwtPayload} from "jsonwebtoken"
import prisma from "@/lib/prisma"

export async function POST(userRequest: Request) {
  const userData = await userRequest.json()
  const accessKeyFromENV = process.env.ACCESS_TOKEN
  if (!accessKeyFromENV) return Response.json({ message: "internal server error", status: 500 })
  try {
    const verifiedData = jwt.verify(userData.userToken, accessKeyFromENV) as JwtPayload
    const UserDetailedInfo=  await prisma.user.findUnique({
      where: {
        user_email:verifiedData.userInfo.user_email
      }
 })
    return Response.json(UserDetailedInfo)
  } catch(error:any) {
    return Response.json({
      message:error.message,
      status:400
    })
  }
}