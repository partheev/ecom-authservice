import { getPassword } from '../db/queries/adminUsers'
import bcrypt from 'bcrypt'

export const validateUserCredentials = async (
  username: string,
  password: string
): Promise<boolean> => {
  const dbpassword = await getPassword(username)
  const correctPw = await bcrypt.compare(password, dbpassword)
  return correctPw
}
