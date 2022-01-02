export interface User {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  hashpassword: string
  password: string
  username: string
}

export interface jwtUserPayload {
  username: string
}
