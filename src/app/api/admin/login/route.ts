import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/common/utils/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, password } = data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user || !password) throw new Error("User not found");
    if (user?.password) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new Error("Incorrect password");
      }
    }
  } catch {
    return new NextResponse(
      JSON.stringify({ errors: "メールアドレスかパスワードが違います" }),
      { status: 400 }
    );
  }
  return new NextResponse(JSON.stringify({ message: "Success" }), {
    status: 201,
  });
}
