export async function POST(UserInfo:Request) {
      const ClientData =await UserInfo.json()
      return Response.json(ClientData)
}