import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const clientData = await req.json();

    if (!clientData.projectName) {
      return new Response(
        JSON.stringify({ message: "Project name is required", status: 400 }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const AccessToken = process.env.ACCESS_TOKEN;
    if (!AccessToken) {
      console.error("ACCESS_TOKEN not set in environment");
      return new Response(
        JSON.stringify({ message: "Internal Server Error", status: 500 }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let verifiedToken: JwtPayload;
    try {
      verifiedToken = jwt.verify(clientData.user_token, AccessToken) as JwtPayload;
    } catch (tokenError) {
      console.error("JWT verification failed:", tokenError);
      return new Response(
        JSON.stringify({ message: "Token expired or invalid", status: 401 }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const userEmail = verifiedToken.userInfo?.user_email;
    if (!userEmail) {
      return new Response(
        JSON.stringify({ message: "Invalid token payload", status: 401 }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = await prisma.user.findUnique({
      where: { user_email: userEmail },
      select: { user_projects: true },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found", status: 404 }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const oldProjects = (user.user_projects as any[]) || [];

    const updatedProjects = oldProjects.filter(
      (project: any) => project.project_name !== clientData.projectName
    );

    const updatedUser = await prisma.user.update({
      where: { user_email: userEmail },
      data: {
        user_projects: updatedProjects,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Project deleted successfully",
        user: updatedUser,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error in deleting project:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", status: 500 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
