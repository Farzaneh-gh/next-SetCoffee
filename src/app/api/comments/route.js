import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import productModel from "@/models/Product";
import { validateEmail } from "@/validators/auth";
import { authUser } from "@/utils/serverHelper";
export async function POST(req) {



  try {
    const reqBody = await req.json();
    const { username, body, email, score, productId } = reqBody;
    if(username.trim()==""||body.trim()==""||email.trim()==""||score==""||productId=="")return Response.json({ message: "All fields are required" }, { status: 400 });  
   const isValidEmail = validateEmail(email);
    if (!isValidEmail) {  
      return Response.json({ message: "Email is not valid" }, { status: 400 });
    }
    const user=await authUser();
    connectToDB();
    const comment = await commentModel.create({
      username,
      body,
      email,
      score,
      productId,
      userId:user?user._id:""
    });
    const updatedProduct = await productModel.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $push: {
          comments: comment._id,
        },
      }
    );
    return Response.json(
      { message: "Comment created successfully",data:comment },
      { status: 201 }
    );
  } catch (err) {
 return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function GET() {
  const comments=await commentModel.find({},"-__v");
  return Response.json({data:comments})
}