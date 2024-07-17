import { connectDb } from "@/lib/db";
import { encriptPassword } from "@/lib/encriptPassword";
// 注册服务
export default async function handler(req, res) {
  if (req.method == "POST") {
    const { email, password } = req.body;
    console.log("body", email, password);
    // 校验注册信息
    if (!email || !email.includes("@") || !password || password.length < 8) {
      console.log("invalid input!");
      res.status(422).json({ message: "invalid input!" });
      return;
    }
    let client;
    let db;
    try {
      client = await connectDb();
      db = client.db();
    } catch (err) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }
    // 验证邮箱是否被注册过
    const register = await db.collection("user").findOne({ email: email });
    console.log("register", register);
    if (register) {
      res.status(422).json({ message: "email has been registed" });
      return;
    }
    // 储存用户信息
    const secretPassword = await encriptPassword(password);
    console.log("secretPassword", secretPassword);
    await db.collection("user").insertOne({
      email,
      password: secretPassword,
    });

    res.status(200).json({ message: "signUp success", code: 200 });
  }
  res.status(422).json({ message: "method unsupport" });
}
