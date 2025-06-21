export async function POST(userRequest: Request) {
      const userData = await userRequest.json
      return Response.json(userData)
}