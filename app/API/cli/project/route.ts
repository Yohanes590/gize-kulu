import prisma from "@/lib/prisma"
import jwt ,{JwtPayload} from 'jsonwebtoken'
export async function POST(userRequest: Request) {
      const UserInfo = await userRequest.json()
      const verifyKey = process.env.ACCESS_TOKEN
      if (!verifyKey) {
            return Response.json({message:"server error!" , status:500})
      }
      const DecodeUserToken = jwt.verify(UserInfo.user_token, verifyKey) as JwtPayload
      const AllProject = await prisma.$runCommandRaw({
            update: "User",
            updates: [
                  {
                  q: { user_email: DecodeUserToken.userInfo.user_email },
                  u: {
                        $push:{
                        user_projects: {
                        project_name: UserInfo.ProjectName,
                        started_date: UserInfo.ProjectStartDate,
                        due_dare: UserInfo.ProjectDueDate,
                        project_description: UserInfo.ProjectDescription,
                        project_task: []
                                    }
                        }
                  }    
                  }
      
            ]
     })
      return Response.json(AllProject)
}
