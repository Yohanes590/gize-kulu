import { prisma } from "@/lib/prisma"
export async function POST(UserInfo: Request) {
      const ClientData = await UserInfo.json()
      const CreateUser = await prisma.user.create({
            data: {
                  username: ClientData.user_name,
                  user_email: ClientData.user_email,
                  user_password: ClientData.user_password,
                  user_task: []
            }
      })
      return Response.json(CreateUser)
}