export async function POST(userRequest: Request) {
      const clientData = await userRequest.json()
      return Response.json(clientData)
}