import express, { Request, Response } from 'express'
import { adminUsersDb } from '../../db/queries/adminUsers'
import { User } from '../../typedefs/users'
import { hashPassword } from '../../utils/hashpw'
const router = express.Router()

router.post('/createUser', async (req: Request, res: Response) => {
  const data: User = req.body
  const hash = await hashPassword(data.password)
  data.hashpassword = hash
  await adminUsersDb.insertAdminUser(data)
  const message = `Admin user (${data.first_name.toUpperCase()}) added.`
  res.send({ message })
})

router.delete('/deleteuser', async (req: Request, res: Response) => {
  const userId = req.body.userId
  await adminUsersDb.deleteAdminUser(userId)
  const message = `Admin user deleted successfully.`
  res.send({ message })
})

export default router
