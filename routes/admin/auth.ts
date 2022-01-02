import express, { Request, Response } from 'express'
import { userDetails } from '../../db/queries/adminUsers'
import { hashPassword } from '../../utils/hashpw'
import { jwtFunc, verifyJwt } from '../../utils/jwt'
import { validateUserCredentials } from '../../utils/validateUser'

const router = express.Router()

router.post('/verifyUser', async (req: Request, res: Response) => {
  const { session } = req.cookies
  const { payload, error } = verifyJwt(session)
  if (!error && payload) {
    const user = await userDetails(payload.username)

    res.send({ adminUser: user })
  }

  res.send()
})
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username && !password) {
    res.status(400)
    res.send({ message: 'Invalid credentials.' })
    return
  }

  const matched = await validateUserCredentials(username, password)
  if (matched) {
    const token = jwtFunc.generateJwt(username)
    res.cookie('session', token)
    res.send({
      message: 'Login successful.',
    })
  } else {
    res.status(400)
    res.send({ message: 'Invalid credentials.' })
  }
})

router.post('/logout', async (req: Request, res: Response) => {
  res.clearCookie('session')
  res.send({
    message: 'Logout successful.',
  })
})
export default router
