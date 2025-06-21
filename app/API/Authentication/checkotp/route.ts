export async function POST(userRequest:Request) {
       
            if (OTP != userOtp) {
                  return Response.json({message:OTP})
            } else {
                  const GettingUser = await prisma.user.update({
                        where: { user_email: FetchEmail },
                        data: {
                              user_verify:true
                        }
                  })
                  if (!GettingUser) {
                        return Response.json({message:"invalid secrete key",status:400})   
                  }
                  return Response.json({message:"verified success fully",status:200})
            }
      
}