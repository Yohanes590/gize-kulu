import prisma from "@/lib/prisma"
import jwt , { JwtPayload } from 'jsonwebtoken'
export async function POST(ClientRequest: Request) {
      const UserRequest = await ClientRequest.json()
      const DecodeAccessKey = process.env.ACCESS_TOKEN;
      const taskObject = {
      id:UserRequest.id,
      task_name: UserRequest.task_name,
      project_priority:UserRequest.project_priority,
      status: UserRequest.status,
      start_date: UserRequest.start_date,
      due_date: UserRequest.due_date,
      title_description:UserRequest.title_description,
            };
      if (!DecodeAccessKey) {
            return Response.json({message:"internal server error" , status:500})
      } else {
           try {
            const decodeToken = jwt.verify(UserRequest.user_Token, DecodeAccessKey) as JwtPayload
             await prisma.$runCommandRaw({
                  update: "User",
                  updates: [{
                        q: { user_email: decodeToken.userInfo.user_email },
                        u: {
                              $push:{
                                  "user_projects.$[project].project_task":taskObject
                              }
                        },
                        arrayFilters: [
                              {"project.project_name":UserRequest.project_name}
                        ]
                  }]
            })
             return Response.json({message:"task success full added" , status:200})
           } catch (error) {
                 return Response.json({ message: "invalid token", status:500})
           }
      }
}