
import DepartmentModel from "@/models/Department";
import connectToDB from "@/configs/db";
export async function POST(req) {
   try{
     const reqBody=await req.json();
    const {title}=reqBody;
    if(title.trim()==="")return Response.json({message:"Title is required"},{status:400});
    await connectToDB();
    const department=await DepartmentModel.create({title});
    if(!department)return Response.json({message:"Something went wrong"},{status:500});
    return Response.json({data:department},{status:200});
   }catch(err){
    return Response.json({message:err.message},{status:500});
   }
}


export async function GET(req) {
   try{
    await connectToDB();
    const departments=await DepartmentModel.find({});
    if(!departments)return Response.json({message:"Something went wrong"},{status:500});
    return Response.json({data:departments},{status:200});
   }catch(err){
    return Response.json({message:err.message},{status:500});
   }
}  