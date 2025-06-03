import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import Path from "path";
import fs from "fs";

export async function POST(req) {
  try {
    connectToDB();
    const formData = await req.formData();
    console.log(formData);
    const name = formData.get("name");
    const price = formData.get("price");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = formData.get("tags").split(",");
    const img = formData.get("img");

    const bufferImage = await img.arrayBuffer();
    const buffer = Buffer.from(bufferImage);

    const newImgName = `${Date.now()}-${img.name}`;
    const newPath = Path.join(process.cwd(), "public", "uploads", newImgName);

    fs.writeFile(newPath, buffer, (err) => {
      if (err) throw err;
    });

    /*  const body = await req.json();
    const {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    } = body; */

    const product = await productModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      imageSrc: `http://localhost:3000/uploads/${newImgName}`,
      image: {
        data: buffer,
        contentType: img.type,
      },
    });
    return Response.json(
      { message: "Product created successfully", data: product },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  connectToDB();
  const products = await productModel.find({}, "-__v").populate("comments");
  return Response.json({ data: products });
}


