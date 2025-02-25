import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import userModel from "@/models/User";
import connectToDB from "@/configs/db";

const hashPassword = async (pass) => {
  const hashedPssword = await hash(pass, 12);
 
  return hashedPssword;
};

const verifyPassword = async (pass, hashedPass) => {
  const isValid = await compare(pass, hashedPass);
  return isValid;
};

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.TokenSecretKey, {
    expiresIn: "60d",
  });
  return token
};

const verifyAccessToken = (token) => {
  try {
     const tokenPayload=verify(token,process.env.TokenSecretKey);
     return tokenPayload
  } catch (err) {
    console.log(err);
    return false
  }
};

const generateRefreshAccessToken=(data)=>{
    const refreshToken = sign({ ...data }, process.env.TokenRefreshSecretKey,{expiresIn:"15d"});
    return refreshToken
}

const authUser=async()=>{
  const cookie=await cookies();
  const token=cookie.get("token");
  if(!token){
    return false
  }
  const tokenPayload=verifyAccessToken(token.value);
  if(!tokenPayload){
    return false
  }
  await connectToDB();
  const userData=await userModel.findOne({email:tokenPayload.email});
  if(!userData){
    return false
  }
 return JSON.parse(JSON.stringify(userData))

}
export { hashPassword,verifyPassword,generateAccessToken,generateRefreshAccessToken,verifyAccessToken,authUser };
