import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth"; 
import { getServerSession } from "next-auth/next";
import { connectDb } from "@/lib/db";
import { encriptPassword, validatePassword } from "@/lib/encriptPassword";
import {authOptions} from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(422).json({ message: "method is not support" });
    return;
  }
  const session = await getServerSession(req,res,authOptions);
  console.log(" reset session", session);
  if (!session) {
    res.status(401).json({ message: "user not authorized" });
    return;
  }
  const client = await connectDb();
  const db = client.db();

  // 校验邮箱是否匹配
  const email = session.user.email;
  const userInfo = await db.collection("user").findOne({ email });
  if (!userInfo) {
    client.close();
    res.status(422).json({ message: "user dont exite" });
    return;
  }

  // 校验原密码是否匹配
  const isValidate = await validatePassword(
    req.body.oldPassword,
    userInfo.password
  );
  if (!isValidate) {
    client.close();
    res.status(422).json({ message: "old password is error" });
    return;
  }

  // 将新密码加密后存到数据库
  const hashPassword = await encriptPassword(req.body.newPassword);
  await db
    .collection("user")
    .updateOne({ email: userInfo.email }, { $set: { password: hashPassword } });
  client.close();
  res.status(200).json({ message: "password reset success", code: 200 });
}
