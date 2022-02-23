import * as bcrypt from 'bcrypt'

const SALT_ROUND = 10

// 生成hash散列
export async function genHash(data: string) {
  const salt = await bcrypt.genSalt(SALT_ROUND)
  return await bcrypt.hash(data, salt)
}

// 对比hash
export async function compareHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}
