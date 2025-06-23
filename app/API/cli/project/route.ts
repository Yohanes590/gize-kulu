export async function POST(userRequest: Request) {
      const UserInfo = await userRequest.json()
      return Response.json({UserInfo})
}