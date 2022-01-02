import jwt from 'jsonwebtoken'
import { jwtUserPayload } from '../typedefs/users'
const key = 'sifofopasfasdfhopifpia'
const generateJwt = (username: string): string => {
  const token = jwt.sign({ username }, key)

  return token
}

export const verifyJwt = (token: string) => {
  try {
    const payload = jwt.verify(token, key) as jwtUserPayload
    return {
      error: false,
      payload,
    }
  } catch (e) {
    return {
      error: true,
      payload: null,
    }
  }
}

export const jwtFunc = { generateJwt, verifyJwt }
