import DepartmentModel from "@/models/Department";
import SubDepartmentModel from "@/models/SubDepartment";
import connectToDB from "@/configs/db";
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { title ,departmentId} = reqBody;
   
    if (title.trim() === "" || departmentId.trim() === "")
      return Response.json({ message: "Title is required" }, { status: 400 });
    await connectToDB();
    const department = await DepartmentModel.findOne({ _id: departmentId });
    if (!department)
      return Response.json({ message: "Department not found" }, { status: 404 });
    const subDepartment = await SubDepartmentModel.create({ title ,departmentId});
    if (!subDepartment)
      return Response.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    return Response.json({ data: subDepartment }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}


