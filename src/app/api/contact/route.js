import connectToDB from "@/configs/db";
import { validateEmail, validatePhone } from "@/validators/auth";
import ContactModel from "@/models/Contact";

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, message, company } = body;

  if (!name.trim() || !email.trim() || !message.trim()) {
    return Response.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return Response.json({ message: "Email is not valid" }, { status: 400 });
  }

  const isValidPhone = validatePhone(phone);
  if (!isValidPhone) {
    return Response.json(
      { message: "Phone number is not valid" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    const contact = await ContactModel.create({
      name,
      email,
      phone,
      message,
      company,
    });
    return Response.json(
      { message: "Contact created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
