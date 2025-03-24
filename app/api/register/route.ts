import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret";
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({ token }, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ error: "Error generating token" }, { status: 500 });
  }
}
