
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    } = body;

    const product = await productModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    });
    return Response.json({ message: "Product created successfully",data:product }, { status: 201 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
    connectToDB();
    const products=await productModel.find({},"-__v").populate("comments");
    return Response.json({data:products})   
}