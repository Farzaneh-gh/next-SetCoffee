import { cookies } from "next/headers";

export async function POST(){
    cookies().delete("token");
    return Response.json({message:"Signout successfully"},{status:200})
}