import connectToDB from "@/configs/db";
import SubDepartmentModel from "@/models/SubDepartment";
export async function GET(req,{params}) {
    const {id}=await params;
  try {
    await connectToDB();
    const subDepartments = await SubDepartmentModel.find(
      { departmentId: id },
      "-_v"
    );
    return Response.json({ data: subDepartments }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
