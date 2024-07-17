import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import { connectDb } from "@/lib/db";
import { validatePassword } from "@/lib/encriptPassword";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentails) {
        try {
          console.log("1111");
          const client = await connectDb();
          const db = client.db();
          // 校验用户名是否存在
          const userInfo = await db
            .collection("user")
            .findOne({ email: credentails.email });
          if (!userInfo) {
            client.close();
            throw new Error("user dont exite");
          }
          // 校验密码是否正确
          const isValidate = await validatePassword(
            credentails.password,
            userInfo.password
          );
          if (!isValidate) {
            client.close();
            throw new Error("password error!");
          }
          client.close();
          // 通过所有校验登录成功并生成token 这里返回的内容会作为生成token的一部分
          return { email: userInfo.email };
        } catch (err) {
          console.log("err", err);
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
