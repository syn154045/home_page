import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/common/utils/prismadb";
import bcrypt from "bcrypt";
import { signUpSchema } from "@/features/validations/admin/loginSchema";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, password } = data;

  // メールアドレス重複確認とバリデーションを同時に行う
  const [user, validationResult] = await Promise.all([
    prisma.user.findFirst({ where: { email } }),
    signUpSchema.safeParseAsync(data)
  ]);

  let errors = validationResult.success ? {} : validationResult.error.flatten().fieldErrors;
  //スプレッド構文で広げてから代入
  if (user) {
    errors.email = [...(errors.email || []), "このメールアドレスは既に使用されています"];
  }

  if (Object.keys(errors).length > 0) {
    return new NextResponse(JSON.stringify({ errors }), { status: 400 });
  }

  // パスワードをハッシュ化してユーザーを作成
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return new NextResponse(JSON.stringify({ message: "Success" }), { status: 201 });
}