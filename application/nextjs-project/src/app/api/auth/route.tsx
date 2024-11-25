import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "I_am_a_SECRET";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // if token does not exist, return not authenticated
  if (!token) {
    console.log("No token found, returning not authenticated");
    return NextResponse.json(
      { authenticated: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
  try {
    console.log("Verifying token");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    return NextResponse.json({ authenticated: true, userId: decoded.userId, email: decoded.email }, { status: 200 });
  } catch (error) {
    console.error("Invalid token", error);
    return NextResponse.json(
      { authenticated: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
