import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";
export async function POST(userRequest: Request) {
      const ClientInfoOBJ = await userRequest.json()
      const Access_Token_key = process.env.ACCESS_TOKEN;
      if (!Access_Token_key) {
            return Response.json({
                  message: "internal server error",
                  status:500
            })
      } else {
            try {
                  const decodedUser = jwt.verify(ClientInfoOBJ.user_token, Access_Token_key) as JwtPayload
                  Response.json(decodedUser)
            } catch (error) {
                  Response.json({
                        message: "Token Expires",
                        status:400
                  })
            }
      }
}