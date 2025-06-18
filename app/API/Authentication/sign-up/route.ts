import prisma  from "@/lib/prisma"
export async function POST(UserInfo: Request) {
      const ClientData = await UserInfo.json()
      if (ClientData.length > 3) {
            return Response.json({message:"client error please input field properly"})
      } else {
           try {
            const CreateUser = await prisma.user.create({
                  data: {
                        user_name: ClientData.user_name,
                        user_email: ClientData.user_email,
                        user_password: ClientData.user_password,
                        user_task: []
                  }
            }) 
            return Response.json(CreateUser)
           } catch (error:any) {
            return Response.json({message:error.message})
           }
}
}