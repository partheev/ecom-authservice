import { User } from '../../typedefs/users'
import { pool } from '../dbConfig'

const insertAdminUser = async (adminUser: User) => {
  const stmt = `INSERT INTO adminusers (first_name,last_name,email,phone_number,password,username) 
                VALUES($1,$2,$3,$4,$5,$6)`
  await pool.query(stmt, [
    adminUser.first_name,
    adminUser.last_name,
    adminUser.email,
    adminUser.phone_number,
    adminUser.hashpassword,
    adminUser.username,
  ])
}

export const getUserDetails = async (username: string) => {
  if (!username) {
    return null
  }
  const stmt = `SELECT username,first_name,last_name,email,phone_number FROM adminusers WHERE username = $1`
  const result = await pool.query(stmt, [username])
  return result.rows[0] as User
}

export const getPassword = async (username: string): Promise<string> => {
  const stmt = `SELECT password FROM adminusers WHERE username = $1`
  const result = await pool.query(stmt, [username])
  const pw = result.rows[0].password as string
  return pw
}
const deleteAdminUser = async (userId: number) => {
  const stmt = `DELETE FROM adminusers WHERE id = $1`
  await pool.query(stmt, [userId])
}
export const adminUsersDb = { insertAdminUser, deleteAdminUser }
