import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const clientData = await req.json();
  const AccessToken = process.env.ACCESS_TOKEN;

  if (!AccessToken) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", status: 500 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const verifiedToken = jwt.verify(clientData.user_token, AccessToken) as JwtPayload;
    const userEmail = verifiedToken.userInfo.user_email;

    const user = await prisma.user.findUnique({
      where: { user_email: userEmail },
      select: { user_projects: true },
    });

    const oldProjects = (user?.user_projects as any[]) || [];

    const updatedProjects = oldProjects.map((project: any) => {
      if (project.project_name === clientData.projectName) {
        const updatedTasks = project.project_task.map((task: any) => {
          if (task.id === clientData.taskId) {
            return {
              ...task,
              ...clientData.updates,
              start_date: clientData.updates.start_date || task.start_date,
              due_date: clientData.updates.due_date || task.due_date,
            };
          }
          return task;
        });

        return {
          ...project,
          project_task: updatedTasks,
        };
      }
      return project;
    });

    const updatedUser = await prisma.user.update({
      where: { user_email: userEmail },
      data: {
        user_projects: updatedProjects,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Task updated successfully inside project",
        user: updatedUser,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (_error:unknown) {
    return new Response(
      JSON.stringify({ message: "Token expired or invalid", status: 400 }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
