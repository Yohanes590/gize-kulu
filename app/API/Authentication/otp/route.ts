export async function POST(userRequest: Request) {
      const userRequestBody = await userRequest.json()
      if (userRequestBody.length > 1) {
            return Response.json({message:"invalid Key" ,status:400})
      } else {
            const UserToken = userRequestBody.user_token
            return Response.json({user_token:UserToken})
      }
}