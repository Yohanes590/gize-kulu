import prisma from "@/lib/prisma"
import jwt ,{JwtPayload} from "jsonwebtoken"
export async function POST(userRequest: Request) {
      const clientData = await userRequest.json()
      
      return Response.json(clientData)
}