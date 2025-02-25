

import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

const getProduct = async (id) => {
  try{
      if (!id) {
        throw new Error("Product ID is required");
      }
      await connectToDB();
    const product=await productModel.findOne({ _id: id }).populate("comments");
    return JSON.parse(JSON.stringify(product))
  }catch(err){
    console.error("Failed to fetch product:", err);
    return null;
  }
};
const getAllPrdoucts = async () => {
  try{
   await connectToDB();
    const products=await productModel.find({},"-__v").populate("comments");
    return JSON.parse(JSON.stringify(products))
  }catch(err){
    console.error("Failed to fetch product:", err);
    return null;
  }
};

const getRelatedProducts = async (tags, currentProductId) => {
  try {
    if (!tags || tags.length === 0) {
      throw new Error("Tags are required to find related products");
    }

    await connectToDB();

    const relatedProducts = await productModel
      .find({
        tags: { $in: tags }, // Find products that share at least one tag
        _id: { $ne: currentProductId }, // Exclude the current product
      });

    return JSON.parse(JSON.stringify(relatedProducts)); 
  } catch (err) {
    console.error("Failed to fetch related products:", err);
    return [];
  }
};



export { getProduct, getAllPrdoucts, getRelatedProducts };

/* const getAllPrdoucts = async () => {
  const baseUrl = typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "";
  try{ const response = await fetch(`${baseUrl}/api/products`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const productData = await response.json();
  return productData?.data;
}catch(err){
  console.error("Failed to fetch product:", err);
  return null;
}

}; */

/* const getProduct = async (id) => {
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "";
  try {
    const response = await fetch(`${baseUrl}/api/products/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const productData = await response.json();

    return productData?.data;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null; // ✅ Return `null` instead of `undefined`
  }
}; */

//Rule of Thumb:

//Inside Components → Use a relative URL (/api/...).
//Inside utils (or Server-Side Code) → Use an absolute URL (http://localhost:3000/api/...).

