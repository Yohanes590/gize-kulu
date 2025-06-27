import prisma from "@/lib/prisma"
import jwt ,{JwtPayload} from 'jsonwebtoken'
export async function POST(userRequest: Request) {
      const UserInfo = await userRequest.json()
      const verifyKey = process.env.ACCESS_TOKEN
      if (!verifyKey) {
            return Response.json({message:"server error!" , status:500})
      }
      const DecodeUserToken = jwt.verify(UserInfo.user_token, verifyKey) as JwtPayload
      try {
                const AllProject = await prisma.$runCommandRaw({
            update: "User",
            updates: [
                  {
                  q: { user_email: DecodeUserToken.userInfo.user_email },
                  u: {
                        $push:{
                              user_projects: {
                        id:UserInfo.Project_id,
                        project_name: UserInfo.ProjectName,
                        started_date: UserInfo.ProjectStartDate,
                        due_date: UserInfo.ProjectDueDate,
                        project_description: UserInfo.ProjectDescription,
                        project_status: UserInfo.ProjectStatus,
                        project_task: []
                                    }
                        }
                  }    
                  }
      
            ]
     })
      return Response.json({message:"project added successfully!" , status:200})
      } catch (error) {
      return Response.json({message:"can't added project",status:500})
      }
}
