import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const clientData = await req.json();
  const AccessToken = process.env.ACCESS_TOKEN;

      if (!AccessToken) {
            return Response.json({message:"internal server error",status:500})
      }
      try {
            const verifiedToken = jwt.verify(clientData.user_token,AccessToken) as JwtPayload
            const userEmail = verifiedToken.userInfo.user_email;
              const user = await prisma.user.findUnique({
           where: { user_email: userEmail },
           select: { user_projects: true },
  });
  const oldProjects = (user?.user_projects as any[]) || [];

  const updatedProjects = oldProjects.map((p: any) =>
    p.id === clientData.projectId
      ? {
          ...p,
          project_name: clientData.project_name,
          started_date: clientData.started_date,
          due_date: clientData.due_date,
          project_description: clientData.project_description,
          project_status: clientData.project_status,
        }
      : p
  );

  const updatedUser = await prisma.user.update({
    where: { user_email: userEmail },
    data: {
      user_projects: updatedProjects,
    },
  });

  return Response.json({
    message: "Project updated successfully",
    user: updatedUser,
  });
      } catch (_error:unknown) {
            return Response.json({message:"token expires" ,status:400})
      }



}
