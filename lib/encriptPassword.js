import { hash, compare } from "bcryptjs";
export async function encriptPassword(password) {
  const newPassword = await hash(password, 12)
  return newPassword
}

export async function validatePassword(password, hasPassword) {
  const isValidate = await compare(password, hasPassword)
  return isValidate
}