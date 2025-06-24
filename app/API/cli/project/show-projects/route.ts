export async function POST(request: Request) {
      const clientSideRequest = await request.json()
      return Response.json(clientSideRequest)
}